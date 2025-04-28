import frappe
from frappe import _

@frappe.whitelist()
def get_loan_details(name=None):
    """Get loan details for the Vue.js component from swp_loan_request DocType"""
    if not name:
        frappe.log_error("No name provided")
        return {}
    
    try:
        # ดึงข้อมูลจาก swp_loan_request DocType โดยใช้ name field
        loan_data = frappe.get_doc("swp_loan_request", name)
        
        # Log ข้อมูลเพื่อตรวจสอบ
        frappe.log_error(f"Loan data: {loan_data.name}")
        
        # แปลงข้อมูลให้อยู่ในรูปแบบที่ Vue component ต้องการ
        result = {
            "loan_data": {
                "applicationNumber": loan_data.name,  # ใช้ name ของ DocType เป็นเลขที่ใบคำขอ
                # ปรับ field ตามโครงสร้างของ swp_loan_request DocType
                "loanType": loan_data.get("loan_type", ""),
                "requestAmount": loan_data.get("loan_amount", 0),
                # ข้อมูลอื่นๆ
            }
        }
        
        # Log ข้อมูลที่จะส่งกลับ
        frappe.log_error(f"Result: {result}")
        
        return result
    except Exception as e:
        frappe.log_error(f"Error fetching loan details: {str(e)}")
        return {}