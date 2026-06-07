(function () {
  const ingredients = [
    { id: "mascarpone", name: "Mascarpone", amount: 250, unit: "g" },
    { id: "cream", name: "Whipping cream", amount: 150, unit: "g" },
    { id: "ladyfinger", name: "Ladyfinger", amount: 120, unit: "g" },
    { id: "espresso", name: "Espresso", amount: 110, unit: "ml" },
    { id: "sugar", name: "Đường", amount: 55, unit: "g" },
    { id: "cacao", name: "Cacao", amount: 8, unit: "g" }
  ];

  const diagnoses = {
    "kem-long": {
      title: "Kem chưa tạo được mạng lưới đủ vững",
      causes: [
        "Nguyên liệu hoặc âu trộn quá ấm.",
        "Kem chưa đạt trạng thái phù hợp trước khi fold.",
        "Thao tác fold kéo dài hoặc làm vỡ quá nhiều bọt khí."
      ],
      checks: "Kiểm tra nhiệt độ nguyên liệu, độ đứng trước khi fold và độ chảy của kem ngay sau khi hoàn tất.",
      action: "Ở mẻ kế tiếp, giữ lạnh dụng cụ và nguyên liệu, dừng đánh theo dấu hiệu bề mặt thay vì chỉ theo thời gian."
    },
    "kem-lon-con": {
      title: "Các pha chưa hòa vào nhau một cách êm",
      causes: [
        "Mascarpone quá lạnh hoặc bị khuấy mạnh khi còn cứng.",
        "Hai hỗn hợp có chênh lệch nhiệt độ lớn.",
        "Kem đã đi quá điểm mịn và bắt đầu tạo hạt."
      ],
      checks: "Quan sát hạt là mềm hay cứng, xuất hiện trước hay sau khi hai phần được trộn với nhau.",
      action: "Làm mềm mascarpone vừa đủ và đưa các thành phần về vùng nhiệt độ gần nhau trước khi kết hợp."
    },
    "tach-nuoc": {
      title: "Có phần nước tự do chưa được giữ lại",
      causes: [
        "Dịch thấm quá nhiều hoặc phân bố không đều.",
        "Cấu trúc kem yếu, co lại trong thời gian nghỉ.",
        "Nhiệt độ bảo quản dao động khiến sản phẩm đổ mồ hôi."
      ],
      checks: "Xác định nước tập trung dưới lớp bánh hay quanh thành hộp, đồng thời xem lại thời gian ngoài tủ lạnh.",
      action: "Cân lượng dịch thấm theo từng hộp và kiểm tra chuỗi lạnh. Nếu có nghi ngờ về an toàn bảo quản, không tiếp tục sử dụng sản phẩm."
    },
    "banh-kho": {
      title: "Dịch thấm chưa đi đến lõi bánh",
      causes: [
        "Lượng espresso thấp so với khối lượng bánh.",
        "Thao tác nhúng quá nhanh hoặc chỉ làm ướt một mặt.",
        "Thời gian nghỉ chưa đủ để độ ẩm phân bố."
      ],
      checks: "Cắt ngang một miếng sau thời gian nghỉ chuẩn và nhìn vùng lõi sáng màu còn lại.",
      action: "Tăng dịch thấm theo bước nhỏ, giữ cách thấm nhất quán và đánh giá lại sau cùng một thời gian nghỉ."
    },
    "banh-nhao": {
      title: "Cấu trúc bánh đã nhận quá nhiều dịch",
      causes: [
        "Nhúng lâu hoặc espresso còn quá nóng.",
        "Bánh có độ xốp cao hơn lô tham chiếu.",
        "Thời gian nghỉ dài trong một cấu trúc vốn đã quá ẩm."
      ],
      checks: "Cân lượng dịch thấm đã dùng và quan sát xem lớp bánh mất hình ngay lúc ráp hay chỉ sau khi nghỉ.",
      action: "Để espresso nguội, giảm lượng dịch theo từng bước và chuẩn hóa thời gian tiếp xúc cho mỗi miếng."
    },
    "ca-phe-gat": {
      title: "Chiết xuất hoặc tỷ lệ đang lấn át phần kem",
      causes: [
        "Espresso bị chiết xuất quá mức.",
        "Nhiệt độ, độ mịn hoặc tỷ lệ pha chưa phù hợp.",
        "Lượng cà phê cao hơn khả năng cân bằng của công thức."
      ],
      checks: "Nếm espresso riêng khi nguội, sau đó nếm cùng kem để phân biệt lỗi pha với lỗi tỷ lệ.",
      action: "Chỉnh một biến pha mỗi lần và ghi lại công thức espresso như một phần của công thức bánh."
    },
    "cat-khong-dung": {
      title: "Toàn bộ hệ chưa có đủ thời gian hoặc độ vững",
      causes: [
        "Kem yếu hoặc lớp kem quá dày.",
        "Bánh quá ẩm làm các lớp trượt lên nhau.",
        "Thời gian nghỉ hoặc nhiệt độ phục vụ chưa phù hợp."
      ],
      checks: "Quan sát lớp nào dịch chuyển trước và đo thời gian sản phẩm đã ở ngoài tủ lạnh.",
      action: "Ổn định cấu trúc kem trước, sau đó chuẩn hóa độ dày lớp, lượng thấm và nhiệt độ phục vụ."
    }
  };

  function formatAmount(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function initScaler() {
    const inputRoot = document.querySelector("[data-ingredient-inputs]");
    const resultRoot = document.querySelector("[data-scaled-results]");
    const multiplierInput = document.querySelector("[data-multiplier]");
    const batchLabel = document.querySelector("[data-batch-label]");
    if (!inputRoot || !resultRoot || !multiplierInput) return;

    inputRoot.innerHTML = ingredients.map((ingredient) => `
      <label class="lab-ingredient-input">
        <span>${ingredient.name}</span>
        <span class="lab-number-field">
          <input type="number" min="0" step="1" value="${ingredient.amount}" data-ingredient="${ingredient.id}">
          <small>${ingredient.unit}</small>
        </span>
      </label>
    `).join("");

    function render() {
      const multiplier = Math.min(20, Math.max(0.5, Number(multiplierInput.value) || 1));
      multiplierInput.value = formatAmount(multiplier);
      if (batchLabel) batchLabel.textContent = `${formatAmount(multiplier)} mẻ`;

      resultRoot.innerHTML = ingredients.map((ingredient) => {
        const amountInput = inputRoot.querySelector(`[data-ingredient="${ingredient.id}"]`);
        const baseAmount = Math.max(0, Number(amountInput.value) || 0);
        return `
          <div class="lab-result-row">
            <span>${ingredient.name}</span>
            <strong>${formatAmount(baseAmount * multiplier)} <small>${ingredient.unit}</small></strong>
          </div>
        `;
      }).join("");
    }

    document.querySelectorAll("[data-step]").forEach((button) => {
      button.addEventListener("click", () => {
        multiplierInput.value = Math.min(20, Math.max(0.5, (Number(multiplierInput.value) || 1) + Number(button.dataset.step)));
        render();
      });
    });

    multiplierInput.addEventListener("change", render);
    inputRoot.addEventListener("input", render);
    render();
  }

  function initDiagnosis() {
    const symptom = document.querySelector("[data-symptom]");
    const result = document.querySelector("[data-diagnosis]");
    if (!symptom || !result) return;

    function render() {
      const diagnosis = diagnoses[symptom.value];
      result.innerHTML = `
        <span class="lab-result-kicker">Hướng kiểm tra</span>
        <h3>${diagnosis.title}</h3>
        <div class="lab-diagnosis-columns">
          <div>
            <strong>Khả năng thường gặp</strong>
            <ul>${diagnosis.causes.map((cause) => `<li>${cause}</li>`).join("")}</ul>
          </div>
          <div>
            <strong>Kiểm tra ngay</strong>
            <p>${diagnosis.checks}</p>
            <strong>Mẻ tiếp theo</strong>
            <p>${diagnosis.action}</p>
          </div>
        </div>
      `;
    }

    symptom.addEventListener("change", render);
    render();
  }

  initScaler();
  initDiagnosis();
})();
