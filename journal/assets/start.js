(function () {
  const paths = {
    new: {
      eyebrow: "Lộ trình nền tảng · Khoảng 30 phút đọc",
      title: "Hiểu chiếc bánh trước khi học thuộc công thức.",
      description: "Bắt đầu từ vai trò của từng lớp, chọn nguyên liệu đúng mục đích, rồi học cách đọc trạng thái kem.",
      steps: [
        ["Tiramisu là gì?", "Nhìn toàn bộ cấu trúc và vai trò của từng lớp.", "tiramisu-la-gi/"],
        ["Bản đồ nguyên liệu", "Biết lựa chọn nào thực sự ảnh hưởng đến kết quả.", "ban-do-nguyen-lieu/"],
        ["Kem mascarpone ổn định", "Đọc dấu hiệu để dừng đúng lúc.", "kem-mascarpone-on-dinh/"]
      ],
      action: ["Mở bộ công cụ thực hành", "lab.html#batch-log"]
    },
    fix: {
      eyebrow: "Lộ trình xử lý lỗi · Bắt đầu từ dấu hiệu",
      title: "Khoan sửa công thức. Hãy xác định lỗi thuộc lớp nào.",
      description: "Dùng công cụ chẩn đoán trước, sau đó đọc sâu về kem và độ ẩm để chọn đúng một thay đổi cho mẻ kế tiếp.",
      steps: [
        ["Tra lỗi trong Charmie Lab", "Chọn triệu chứng gần nhất và kiểm tra theo thứ tự.", "lab.html#troubleshooting"],
        ["Kem mascarpone ổn định", "Xử lý kem lỏng, lợn cợn hoặc tách béo.", "kem-mascarpone-on-dinh/"],
        ["Kiểm soát độ ẩm", "Phân biệt bánh mềm đúng mức với bánh nhão.", "kiem-soat-do-am/"]
      ],
      action: ["Ghi lại mẻ vừa làm", "lab.html#batch-log"]
    },
    science: {
      eyebrow: "Lộ trình khoa học · Hiểu để tự điều chỉnh",
      title: "Đi từ hiện tượng trong âu kem đến cảm giác khi ăn.",
      description: "Lộ trình này giải thích vì sao kem đứng, bánh hút cà phê và hương vị thay đổi sau một đêm.",
      steps: [
        ["Tiramisu dưới góc nhìn khoa học", "Nhũ tương, bọt khí, mao dẫn và chất béo.", "khoa-hoc-cua-tiramisu/"],
        ["Vì sao cần thời gian nghỉ?", "Theo dõi độ ẩm và hương vị tái phân bố.", "vi-sao-can-thoi-gian-nghi/"],
        ["Đường và cân bằng vị", "Hiểu vị ngọt như một phần của cấu trúc.", "duong-va-can-bang-vi/"],
        ["Gelatin và cấu trúc kem", "Đặc tính tạo gel và ranh giới tan chảy mượt mà.", "gelatin-va-cau-truc-kem/"]
      ],
      action: ["Mở Từ điển Tiramisu", "glossary.html"]
    },
    sell: {
      eyebrow: "Lộ trình vận hành · Làm mẻ có thể lặp lại",
      title: "Từ một công thức ngon đến một quy trình đáng tin.",
      description: "Ưu tiên an toàn và khả năng lặp lại trước khi tối ưu sản lượng, chi phí hoặc bao bì.",
      steps: [
        ["An toàn và chuỗi lạnh", "Thiết kế quy trình phù hợp với món lạnh có trứng và sữa.", "an-toan-va-chuoi-lanh/"],
        ["Kỹ thuật thanh trùng trứng", "Gia nhiệt cách thủy diệt khuẩn Salmonella bằng phương pháp Sabayon.", "thanh-trung-long-do-sabayon/"],
        ["Scale công thức", "Tăng mẻ mà vẫn kiểm soát tải máy và sai số.", "scale-cong-thuc/"],
        ["Lập kế hoạch sản xuất", "Đi ngược từ giờ giao về từng mốc trong bếp.", "lap-ke-hoach-san-xuat/"],
        ["Bao bì quà tặng", "Bảo vệ cấu trúc và trải nghiệm khi mở hộp.", "bao-bi-va-trai-nghiem-qua-tang/"]
      ],
      action: ["Tính thử giá vốn một mẻ", "lab.html#costing"]
    }
  };

  const result = document.querySelector("[data-start-result]");
  const buttons = document.querySelectorAll("[data-start-option]");
  if (!result || !buttons.length) return;

  function render(key) {
    const path = paths[key];
    result.innerHTML = `
      <div class="start-result-head">
        <div>
          <span class="j-eyebrow">${path.eyebrow}</span>
          <h2>${path.title}</h2>
        </div>
        <p>${path.description}</p>
      </div>
      <ol class="start-route">
        ${path.steps.map((step, index) => `
          <li>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>${step[0]}</strong>
              <p>${step[1]}</p>
            </div>
            <a href="${step[2]}" aria-label="Đọc ${step[0]}">Đọc bài →</a>
          </li>
        `).join("")}
      </ol>
      <a class="j-primary-link start-action" href="${path.action[1]}">${path.action[0]} <span aria-hidden="true">→</span></a>
    `;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render(button.dataset.startOption);
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  render("new");
})();
