(function () {
  const terms = [
    { term: "Mascarpone", category: "Nguyên liệu", definition: "Phô mai tươi giàu chất béo của Ý, tạo độ béo, mềm và nền cấu trúc cho phần kem.", article: "ban-do-nguyen-lieu" },
    { term: "Ladyfinger", alias: "Savoiardi", category: "Nguyên liệu", definition: "Bánh quy xốp nhẹ có khả năng hút dịch nhanh. Độ xốp quyết định lượng espresso bánh có thể nhận.", article: "tiramisu-la-gi" },
    { term: "Espresso", category: "Nguyên liệu", definition: "Cà phê cô đặc được pha dưới áp suất. Trong tiramisu, cần đủ rõ vị sau khi gặp chất béo nhưng không quá gắt.", article: "espresso-cho-tiramisu" },
    { term: "Cacao không đường", category: "Nguyên liệu", definition: "Bột cacao không bổ sung đường, dùng để tạo lớp hương đắng thơm trên bề mặt.", article: "cacao-va-lop-ket-thuc" },
    { term: "Matcha", category: "Nguyên liệu", definition: "Bột trà xanh nghiền mịn, nhạy với nhiệt, ánh sáng và không khí; cần rây và phân tán kỹ.", article: "matcha-trong-tiramisu" },
    { term: "Marsala", category: "Nguyên liệu", definition: "Rượu vang tăng cường của Sicily, thường mang nhóm hương trái cây khô và caramel.", article: "ruou-va-huong-thom" },
    { term: "Trứng thanh trùng", category: "Nguyên liệu", definition: "Trứng đã được xử lý nhiệt có kiểm soát để giảm rủi ro vi sinh mà chưa làm đông hoàn toàn.", article: "an-toan-va-chuoi-lanh" },
    { term: "Whipping cream", category: "Nguyên liệu", definition: "Kem sữa có hàm lượng chất béo đủ để giữ bọt khí khi đánh lạnh.", article: "kem-mascarpone-on-dinh" },

    { term: "Fold", category: "Kỹ thuật", definition: "Thao tác trộn nhẹ theo vòng gập để kết hợp hai hỗn hợp trong khi hạn chế làm vỡ bọt khí.", article: "kem-mascarpone-on-dinh" },
    { term: "Soft peak", alias: "Chóp mềm", category: "Kỹ thuật", definition: "Trạng thái kem tạo chóp nhưng đầu chóp cong xuống. Thường còn đủ mềm để tiếp tục fold.", article: "kem-mascarpone-on-dinh" },
    { term: "Overwhip", alias: "Đánh quá tay", category: "Kỹ thuật", definition: "Đánh kem vượt quá vùng mịn ổn định, khiến bề mặt lợn cợn và có nguy cơ tách pha.", article: "kem-mascarpone-on-dinh" },
    { term: "Dịch thấm", category: "Kỹ thuật", definition: "Phần chất lỏng được đưa vào lớp bánh, thường gồm espresso và có thể thêm đường hoặc rượu.", article: "kiem-soat-do-am" },
    { term: "Mise en place", category: "Kỹ thuật", definition: "Chuẩn bị và sắp xếp đầy đủ nguyên liệu, dụng cụ trước khi bắt đầu thao tác.", article: "lap-ke-hoach-san-xuat" },
    { term: "Rây", category: "Kỹ thuật", definition: "Cho nguyên liệu bột qua lưới mịn để phá cụm và phân bố đều hơn.", article: "cacao-va-lop-ket-thuc" },
    { term: "Nhiệt độ phục vụ", category: "Kỹ thuật", definition: "Nhiệt độ sản phẩm tại lúc ăn; ảnh hưởng rõ đến độ mềm, hương thơm và cảm nhận vị.", article: "danh-gia-cam-quan" },

    { term: "Nhũ tương", category: "Khoa học", definition: "Hệ gồm hai chất lỏng vốn khó hòa tan, như nước và chất béo, được phân tán và giữ ổn định.", article: "khoa-hoc-cua-tiramisu" },
    { term: "Bọt khí", category: "Khoa học", definition: "Các túi khí nhỏ được giữ trong mạng lưới kem, tạo cảm giác nhẹ và góp phần giữ hình.", article: "khoa-hoc-cua-tiramisu" },
    { term: "Mao dẫn", category: "Khoa học", definition: "Hiện tượng chất lỏng di chuyển trong các khe rỗng nhỏ của bánh mà không cần lực ép bên ngoài.", article: "khoa-hoc-cua-tiramisu" },
    { term: "Nước tự do", category: "Khoa học", definition: "Phần nước không được cấu trúc giữ chặt, có thể dịch chuyển hoặc tích tụ dưới đáy hộp.", article: "kiem-soat-do-am" },
    { term: "Tái phân bố độ ẩm", category: "Khoa học", definition: "Quá trình nước di chuyển giữa lớp bánh và lớp kem trong thời gian nghỉ để tiến tới cân bằng.", article: "vi-sao-can-thoi-gian-nghi" },
    { term: "Cảm nhận béo", category: "Khoa học", definition: "Tổng hợp cảm giác phủ miệng, độ mượt và cách chất béo làm thay đổi sự xuất hiện của hương vị.", article: "duong-va-can-bang-vi" },

    { term: "Định mức", category: "Vận hành", definition: "Khối lượng hoặc lượng sử dụng chuẩn cho một sản phẩm hay một mẻ.", article: "scale-cong-thuc" },
    { term: "Hao hụt", category: "Vận hành", definition: "Phần nguyên liệu hoặc thành phẩm mất đi trong cân, trộn, chuyển âu, tạo hình và đóng gói.", article: "scale-cong-thuc" },
    { term: "Yield", alias: "Sản lượng", category: "Vận hành", definition: "Số lượng thành phẩm thực tế thu được từ một mẻ sau khi tính hao hụt.", article: "scale-cong-thuc" },
    { term: "Chuỗi lạnh", category: "Vận hành", definition: "Hệ thống giữ sản phẩm trong vùng nhiệt độ lạnh phù hợp xuyên suốt lưu trữ và vận chuyển.", article: "an-toan-va-chuoi-lanh" },
    { term: "Mã mẻ", category: "Vận hành", definition: "Mã nhận diện giúp truy lại ngày làm, nguyên liệu, người thực hiện và kết quả của một mẻ.", article: "lap-ke-hoach-san-xuat" },
    { term: "Scorecard cảm quan", category: "Vận hành", definition: "Phiếu đánh giá theo tiêu chí cố định như độ ẩm, độ mịn, cân bằng vị và hậu vị.", article: "danh-gia-cam-quan" },
    { term: "Khoảng đệm", category: "Vận hành", definition: "Phần thời gian dự phòng trong lịch sản xuất để hấp thụ chậm trễ hoặc kiểm tra lại.", article: "lap-ke-hoach-san-xuat" }
  ];

  const grid = document.querySelector("[data-glossary-grid]");
  const search = document.querySelector("[data-glossary-search]");
  const filters = document.querySelectorAll("[data-glossary-filter]");
  const count = document.querySelector("[data-glossary-count]");
  const empty = document.querySelector("[data-glossary-empty]");
  if (!grid) return;

  let activeCategory = "Tất cả";
  let query = "";

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .trim();
  }

  function render() {
    const needle = normalize(query);
    const visible = terms.filter((item) => {
      const matchesCategory = activeCategory === "Tất cả" || item.category === activeCategory;
      const haystack = normalize([item.term, item.alias, item.category, item.definition].join(" "));
      return matchesCategory && (!needle || haystack.includes(needle));
    });

    grid.innerHTML = visible.map((item) => `
      <article class="glossary-card">
        <div class="glossary-card-head">
          <span>${item.category}</span>
          <strong>${item.term}</strong>
          ${item.alias ? `<small>${item.alias}</small>` : ""}
        </div>
        <p>${item.definition}</p>
        <a href="article.html?slug=${encodeURIComponent(item.article)}">Đọc giải thích sâu hơn →</a>
      </article>
    `).join("");

    if (count) count.textContent = `${visible.length} thuật ngữ`;
    if (empty) empty.style.display = visible.length ? "none" : "block";
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.glossaryFilter;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });

  if (search) {
    search.addEventListener("input", () => {
      query = search.value;
      render();
    });
  }

  render();
})();
