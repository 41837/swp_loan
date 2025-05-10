// import CustomFileUploaderWrapper from "./custom_file_uploader.js";

frappe.pages["swp-file-attachment"].on_page_load = function (wrapper) {
	const can_create = frappe.model.can_create("Attachment");
	const can_delete = frappe.model.can_delete("Attachment");
	const can_select = frappe.model.can_select("Attachment");
	const can_export = frappe.model.can_export("Attachment");
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'swp-file-attachment',
		single_column: true
	});

    // Get parent name
    const parent_name = frappe.get_route_str().split("/")[1];
	async function loadLoanAndAttachment() {
    let loan = {
        customer_name: "No data",
        contract_number: "No data",
        collateral_number: "No data"
    };

    // Load loan application
    const docs = await frappe.db.get_list("Loan Application", { fields: ["name"], limit: 1 });
    if (docs.length > 0) {
        const full_doc = await frappe.db.get_doc("Loan Application", docs[0].name);
		console.log(full_doc);
        loan = {
            customer_name: full_doc.cus_first_name + " " + full_doc.cus_last_name,
            contract_number: full_doc.cus_addresses_detail?.[0]?.mobile_number || "No mobile number",
            collateral_number: full_doc.cus_identification_number,
        };
    }
    $(frappe.render_template("swp_file_attachment", { loan })).appendTo(page.main);

    // Load attachment
    const doc = await frappe.db.get_list("Attachment", {
        fields: ["*"],
        filters: {
            is_group: 1,
            parent_attachment: "",
            is_custom: 0,
            reference_document: parent_name
        }
    });

    if (doc.length > 0) {
        set_tree(doc[0].name, doc[0].description);
    } else {
        const result_root = await frappe.call({
            method: "z_loan.loan.page.file_attachment.file_attachment.create_root",
            args: { docname: parent_name }
        });
        create_folder(parent_name, "Home/Attachments", async () => {
            const r = await frappe.call({
                method: "z_loan.api.generate_folder_structure",
                args: {
                    reference_document: parent_name,
                    loan_app_doc: frappe.route_options.loan_app_doc,
                    sales_kit_doc: frappe.route_options.sales_kit_doc,
                }
            });
            set_tree(result_root.message.name, result_root.message.description);
        });
    }
}

loadLoanAndAttachment();


	frappe.ui.keys.add_shortcut({
		shortcut: "up",
        action: () => handle_navigation_node("up"),
        description: __("Navigate node up"),
        page: this.page
	});
	
	frappe.ui.keys.add_shortcut({
		shortcut: "down",
        action: () => handle_navigation_node("down"),
        description: __("Navigate node down"),
        page: this.page
	});

	if(can_export){
		page.add_inner_button(__("Downloads"), function () {
			download_files(parent_name);
		});
	}

	function set_tree(root_name,root_description) {
		doctype = "Attachment"
		parent = ""
		frappe.file_attachment_tree = new frappe.ui.Tree({
			parent: $("#treeview"),
			label:root_description,
			root_value: root_name,
			method: "z_loan.loan.page.file_attachment.file_attachment.get_children",
			args: {
				doctype: doctype
			},
			get_label: function (node) {
				let node_label = "";
				if(node.title) {
					node_label = node.title
				}
				else {
					node_label = root_description
				}
				if (node.data.is_required) {
					node_label += ' <b style="color:red;">*</b>'
				}
				if (node.data.is_verified) {
					node_label += " ✅"
				}
				return node_label
			},
			toolbar: [
				{
					label: __("New Folder"),
					condition: function (node) {
						return node.expandable == 1 && can_create
					},
					click: function (node) {
						add_node(node)
					}
				},
				{
					label: __("Add File"),
					condition: function (node) {
						return node.expandable == 1 && (node.is_root === "undefined" || !node.is_root) && can_create
					},
					click: function (node) {
						add_file(node)
					}
				},
				{
					label: __("Verify"),
					condition: function (node) {
						return node.expandable == 0 && can_select && !node.data.is_verified
					},
					click: function (node) {
						verify_node(node)
					}
				},
				{
					label: __("Move",null,"Attachment"),
					condition: function (node) {
						return node.expandable == 0 && can_create
					},
					click: function (node) {
						move_node(node)
					}
				},
				{
					label: __("Delete"),
					condition: function (node) {
						return !node.is_root && node.data.is_custom && can_delete
					},
					click: function (node) {
						delete_node(node)

					}
				}
			],
			on_click: (node) => {
				parent = node["name"]
				if (node["data"]["expandable"] == 0) {
					set_preview(doctype, node["data"]["value"])
				}
				else if (node["data"]["expandable"] == undefined) {
					set_preview_thumbnail()
				}
			}
		});
		frappe.file_attachment_tree.refresh();
	}

	function set_preview(doctype, parent) {
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: doctype,
				name: parent
			},
			callback: function (response) {
				var doc = response.message;
				if (doc) {
					frappe.call({
						method: "z_loan.loan.page.file_attachment.file_attachment.get_file_by_url",
						args: { file_url: doc.attach_file },
						callback: function (res) {
							doc_file = res.message[0]
							let preview = $("#preview");
							let $preview = ""
							let file_extension = doc_file.file_type.toLowerCase();
							if (frappe.utils.is_image_file(doc_file.file_url)) {
								$preview = $(`<div class="img_preview">
												<img
													class="img-responsive"
													src="${frappe.utils.escape_html(doc_file.file_url)}"
												/>
											</div>`);
							} else if (frappe.utils.is_video_file(doc_file.file_url)) {
								$preview = $(`<div class="img_preview">
												<video width="480" height="320" controls>
													<source src="${frappe.utils.escape_html(doc_file.file_url)}">
													${__("Your browser does not support the video element.")}
												</video>
											</div>`);
							} else if (file_extension === "pdf") {
								$preview = $(`<div class="img_preview">
												<object style="background:#323639;" width="100%">
													<embed
														style="background:#323639;"
														width="100%"
														height="690"
														src="${frappe.utils.escape_html(doc_file.file_url)}" type="application/pdf"
													>
												</object>
											</div>`);
							} else if (file_extension === "mp3") {
								$preview = $(`<div class="img_preview">
												<audio width="480" height="60" controls>
													<source src="${frappe.utils.escape_html(doc_file.file_url)}" type="audio/mpeg">
													${__("Your browser does not support the audio element.")}
												</audio >
											</div>`);
							}

							if ($preview) {
								preview.html($preview);
							}
						}
					})
				}
			}
		});
	}
	async function set_preview_thumbnail() {
		let preview = $('#preview');
		if(!frappe.all_node){
			await get_all_node();
		}
		preview.empty()
		frappe.all_node.forEach(function (folder) {
			let $folderDiv = $('<div class="folder"></div>');
			let $folderHeading = $("<h3></h3>").text(folder.folder);
			$folderDiv.append($folderHeading);

			folder.url.forEach(function (url) {
				let $preview = $(`<div class="img_thumbnail">
											<img
												class="img-responsive"
												src="${frappe.utils.escape_html(url)}"
											/>
										</div>`);
				$folderDiv.append($preview);
			});
			preview.append($folderDiv);
		});
	}

	function add_file(node) {
		root_path = get_root_path(node);
		new frappe.ui.FileUploader({
			folder: "Home/Attachments/" + parent_name + "/" + root_path,
			make_attachments_public: 0,
			on_success: (file) => {
				frappe.call({
					method: "z_loan.loan.page.file_attachment.file_attachment.create_attachment",
					args: {
						docname: parent_name,
						description: file.file_name,
						is_custom: 1,
						is_group: 0,
						parent_attachment: node.data.value,
						file: file
					},
					callback: function (r) {
						refresh_tree();
						frappe.all_node = null;
					}
				});
			},
		});
	}
	function add_node(node) {
		let title = node.title ? node.title : node.label;
		var dialog = new frappe.ui.Dialog({
			title: __("{0}", [title]),
			fields: [
				{
					label: __("Folder Name"),
					fieldname: "folder_name",
					fieldtype: "Data"
				},
			]
		});
		dialog.set_primary_action(__("New Folder"), function () {
			var d = dialog.get_values();
			frappe.call({
				method: "z_loan.loan.page.file_attachment.file_attachment.create_attachment",
				args: {
					docname: parent_name,
					description: d.folder_name,
					is_custom: 1,
					is_group: 1,
					parent_attachment: node.data.value,
					file: null
				},
				callback: function (r) {
					root_path = get_root_path(node);
					file_path = "Home/Attachments/" + parent_name + (root_path === "" ? "" : "/" + root_path);
					create_folder(d.folder_name, file_path, () => {
						dialog.hide();
						refresh_tree();
					});
				}
			});

		});
		dialog.show();
	}
	function delete_node(node) {
		var dialog = new frappe.ui.Dialog({
			title: __("{0}", [node.title]),
			fields: [
				{
					label: __("Are you sure you want to delete this document?"),
					fieldname: "confirm_message",
					fieldtype: "HTML",
					options: `<p>${__("Are you sure you want to delete this document? This action cannot be undone.")}</p>`
				}
			]
		});
		dialog.set_primary_action(__("Delete"), function () {
			var d = dialog.get_values();
			frappe.call({
				method: "z_loan.loan.page.file_attachment.file_attachment.delete_doc",
				args: {
					doctype: doctype,
					docname: node.data.value
				},
				callback: function (r) {
					node.parent.remove();
					dialog.hide();
					frappe.all_node = null;
					set_preview_thumbnail();
				}
			});

		});
		dialog.show();
	}
	function verify_node(node) {
		var dialog = new frappe.ui.Dialog({
			title: __("{0}", [node.title]),
			fields: [
				{
					label: __("Document Verification"),
					fieldname: "verify_message",
					fieldtype: "HTML",
					options: `<p>${__("Please verified the document and confirmed that all the information is accurate?")}</p>`
				}
			]
		});
		dialog.set_primary_action(__("Verify"), function () {
			frappe.call({
				method: "z_loan.loan.page.file_attachment.file_attachment.verify_doc",
				args: {
					doctype: doctype,
					docname: node.data.value
				},
				callback: function (r) {
					dialog.hide();
					frappe.file_attachment_tree.refresh()
				}
			});

		});
		dialog.show();
	}
	function move_node(node) {
		folder_list = [];
		Object.keys(frappe.file_attachment_tree.nodes).forEach(key => {
			node_item = frappe.file_attachment_tree.nodes[key];
			if (node_item.expandable == true && (node_item.is_root == undefined || node_item.is_root == false) &&
				node.parent_node.title != node_item.title) {
				folder_list.push({
					"value":node_item.data.value,
					"label":node_item.title
				});
			}
		});
		var dialog = new frappe.ui.Dialog({
			title: __("{0}", [node.title]),
			fields: [
				{
					label: __("Move to folder"),
					fieldname: "new_folder",
					fieldtype: "Select",
					options: folder_list
				},
			]
		});
		dialog.set_primary_action(__("Move"), function () {
			let d = dialog.get_values();
			frappe.call({
				method: "z_loan.loan.page.file_attachment.file_attachment.move_file",
				args: {
					docname: node.data.value,
					new_parent: d.new_folder
				},
				callback: function (r) {
					dialog.hide();
					refresh_tree();
				}
			});
		});
		dialog.show();
	}
	function create_folder(folder_name, root_folder, call_back) {
		if (folder_name.indexOf("/") > -1) {
			frappe.throw(__("Folder name should not include "/" (slash)"));
		}
		const data = {
			file_name: folder_name,
			folder: root_folder,
		};
		frappe.call({
			method: "frappe.core.api.file.create_new_folder",
			args: data,
			callback: call_back
		});
	}

	function get_root_path(node) {
		const parents = [];
		if (node.parent_node != undefined) {
			parents.push(node.title);
			let current_node = node.parent_node;
			while (current_node.parent_node != undefined) {
				parents.push(current_node.title);
				current_node = current_node.parent_node;
			}
		}
		return parents.reverse().join("/");
	}
	function get_all_folder_by_root(node) {
		const parents = [];
		parents.push(node.title);
		let current_node = node.parent_node;
		while (current_node.parent_node != undefined) {
			parents.push(current_node.title);
			current_node = current_node.parent_node;
		}
		return parents.reverse().join("/");
	}
	function refresh_tree() {
		frappe.file_attachment_tree.refresh();
	}
	function get_all_node(){
		return frappe.call({
			method: 'z_loan.api.get_all_node',
			args: {
				reference_document: parent_name
			},
			callback: function (response) {
				frappe.all_node = response.message.node_list;
			}
		});
	}
	function handle_navigation_node(direction){
		const current_node = $(document.activeElement).find(".tree-link.selected");
		const all_node = $(document.activeElement).find(".tree-link");
		const all_node_not_folder_opened = all_node.filter(function() {
			return $(this).parent().find(".tree-node.opened").length === 0;
		});
		const current_index = all_node_not_folder_opened.index(current_node);
		let next_index = 0
		if(direction === "down"){
			next_index = current_index + 1;
		}
		else{
			next_index = current_index - 1;
		}
		if (next_index >= 0 && next_index < all_node_not_folder_opened.length) {
			next_node = all_node_not_folder_opened.eq(next_index);
			next_node.click();
		}
	}
	function download_files(reference_document){
		open_url_post("/api/method/z_loan.api.download_zip_files", {
            reference_document: reference_document
          });
	}
};
