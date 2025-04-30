// LoanDetailPage.js
frappe.provide('swp_loan.vue_components');

swp_loan.vue_components.LoanDetailPage = {
  template: `
    <div class="loan-detail-container">
      <!-- Header with navigation tabs -->
      <div class="nav-tabs">
        <div class="tab active">ทั่วไป</div>
        <div class="tab">หลักประกัน</div>
        <div class="tab">รายละเอียดสินเชื่อ</div>
        <div class="tab">ผู้กู้</div>
        <div class="tab">ผู้ค้ำ</div>
        <div class="tab">Scoring</div>
        <div class="tab">บันทึกอนุมัติ</div>
        <div class="tab">เอกสารแนบ</div>
      </div>

      <!-- Loan Basic Information Section -->
      <div class="section">
        <div class="section-header">ข้อมูลใบคำขอสินเชื่อเบื้องต้น</div>
        <div class="section-content">
          <div class="grid-container">
            <div class="grid-row">
              <div class="grid-label">เลขที่ใบคำขอสินเชื่อ</div>
              <div class="grid-value">{{ loanData.applicationNumber }}</div>
              <div class="grid-label">เดินเบญ</div>
              <div class="grid-value">{{ loanData.loanType }}</div>
              <div class="grid-label">ยอดขอ</div>
              <div class="grid-value">{{ formatNumber(loanData.requestAmount) }}</div>
              <div class="grid-label">A : -</div>
            </div>
            <div class="grid-row">
              <div class="grid-label">รหัสลูกค้า</div>
              <div class="grid-value">{{ loanData.customerCode }}</div>
              <div class="grid-label">ค่าธรรมเนียม</div>
              <div class="grid-value">{{ formatNumber(loanData.fee) }}</div>
            </div>
            <div class="grid-row">
              <div class="grid-label">CE - Credit กำลังแก้ไขรายการ</div>
              <div class="grid-value">{{ loanData.loanCategory }}</div>
              <div class="grid-label">รหัสสินค้า</div>
              <div class="grid-value">{{ loanData.productCode }}</div>
              <div class="grid-label">ยอดโอน</div>
              <div class="grid-value">{{ formatNumber(loanData.transferAmount) }}</div>
              <div class="grid-label">B : -</div>
            </div>
          </div>
        </div>
      </div>

      <!-- เพิ่มส่วนอื่นๆ ตามที่มีในโค้ดเดิม -->
      <!-- Loan Details Section -->
      <div class="section">
        <div class="section-header">รายละเอียดสินเชื่อ</div>
        <!-- เนื้อหาส่วนรายละเอียดสินเชื่อ -->
      </div>

      <!-- Borrower Information Section -->
      <div class="section">
        <div class="section-header">ข้อมูลผู้กู้</div>
        <!-- เนื้อหาส่วนข้อมูลผู้กู้ -->
      </div>

      <!-- Guarantor Information Section -->
      <div class="section">
        <div class="section-header">ข้อมูลผู้ค้ำประกัน / ผู้กู้ร่วม</div>
        <!-- เนื้อหาส่วนข้อมูลผู้ค้ำประกัน -->
      </div>

      <!-- Collateral Information Section -->
      <div class="section">
        <div class="section-header">ข้อมูลหลักประกัน</div>
        <!-- เนื้อหาส่วนข้อมูลหลักประกัน -->
      </div>
    </div>
  `,
  data() {
    return {
      loanData: {
        applicationNumber: '123312',
        loanType: 'M001N',
        requestAmount: 26800.00,
        customerCode: '123456789999',
        fee: 800.00,
        loanCategory: 'LOAN',
        productCode: 'MH123425535343',
        transferAmount: 26000.00,
        // เพิ่มข้อมูลอื่นๆ ตามที่มีในโค้ดเดิม
      },
      borrower: {
        // ข้อมูลผู้กู้
      },
      guarantor: {
        // ข้อมูลผู้ค้ำประกัน
      },
      collateral: {
        // ข้อมูลหลักประกัน
      }
    };
  },
  methods: {
    formatNumber(value) {
      if (value === 0) return '0.00';
      if (!value) return '';
      return new Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    },
    fetchLoanData(name) {
        if (!name) {
          console.error("No name provided to fetchLoanData");
          return;
        }
        
        console.log("Fetching loan data for:", name);
        
        frappe.call({
          method: 'swp_loan.swp_loan.page.swp_loan_request_branch.swp_loan_request_branch.get_loan_details',
          args: {
            name: name
          },
          callback: (response) => {
            console.log("API Response:", response);
            
            if (response.message) {
              const data = response.message;
              console.log("Loan data received:", data);
              
              if (data.loan_data) {
                console.log("Application Number:", data.loan_data.applicationNumber);
                
                this.loanData = {
                  ...this.loanData,
                  ...data.loan_data
                };
                
                console.log("Updated loanData:", this.loanData);
              } else {
                console.error("No loan_data in response");
              }
              
              // ... โค้ดอื่นๆ ...
            } else {
              console.error("No message in response");
            }
          },
          error: (err) => {
            console.error("API Error:", err);
          }
        });
      }
  },
  mounted() {
    console.log("Vue component mounted");
    
    // ดึงข้อมูลเมื่อ component ถูกโหลด
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    console.log("URL Parameter 'name':", name);
    
    if (name) {
      this.fetchLoanData(name);
    } else {
      console.warn("No 'name' parameter in URL");
    }
  }
};