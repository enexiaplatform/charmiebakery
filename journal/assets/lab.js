(function () {
  const ingredients = [
    { id: "mascarpone", name: "Mascarpone", amount: 250, unit: "g", packSize: 250, packPrice: 115000 },
    { id: "cream", name: "Whipping cream", amount: 150, unit: "g", packSize: 1000, packPrice: 180000 },
    { id: "ladyfinger", name: "Ladyfinger", amount: 120, unit: "g", packSize: 200, packPrice: 85000 },
    { id: "espresso", name: "Espresso", amount: 110, unit: "ml", packSize: 1000, packPrice: 120000 },
    { id: "sugar", name: "Đường", amount: 55, unit: "g", packSize: 1000, packPrice: 32000 },
    { id: "cacao", name: "Cacao", amount: 8, unit: "g", packSize: 100, packPrice: 65000 }
  ];

  const storageKeys = {
    costs: "charmie-lab-costs-v1",
    logs: "charmie-lab-logs-v2"
  };

  const labState = {
    multiplier: 1,
    scaledAmounts: {}
  };

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

  function formatCurrency(value) {
    return `${Math.round(value).toLocaleString("vi-VN")}đ`;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function readStorage(key, fallback) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
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
      labState.multiplier = multiplier;
      if (batchLabel) batchLabel.textContent = `${formatAmount(multiplier)} mẻ`;

      resultRoot.innerHTML = ingredients.map((ingredient) => {
        const amountInput = inputRoot.querySelector(`[data-ingredient="${ingredient.id}"]`);
        const baseAmount = Math.max(0, Number(amountInput.value) || 0);
        labState.scaledAmounts[ingredient.id] = baseAmount * multiplier;
        return `
          <div class="lab-result-row">
            <span>${ingredient.name}</span>
            <strong>${formatAmount(labState.scaledAmounts[ingredient.id])} <small>${ingredient.unit}</small></strong>
          </div>
        `;
      }).join("");

      document.dispatchEvent(new CustomEvent("charmie:scale-change"));
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

  function initCosting() {
    const inputRoot = document.querySelector("[data-cost-inputs]");
    const ingredientCostOutput = document.querySelector("[data-ingredient-cost]");
    const totalCostOutput = document.querySelector("[data-total-cost]");
    const unitCostOutput = document.querySelector("[data-unit-cost]");
    const wasteRateInput = document.querySelector("[data-waste-rate]");
    const yieldInput = document.querySelector("[data-yield-count]");
    const packagingInput = document.querySelector("[data-packaging-cost]");
    const overheadInput = document.querySelector("[data-overhead-cost]");
    if (!inputRoot || !ingredientCostOutput || !totalCostOutput || !unitCostOutput) return;

    const saved = readStorage(storageKeys.costs, {});
    const savedIngredients = saved.ingredients || {};

    inputRoot.innerHTML = `
      <div class="lab-cost-header" aria-hidden="true">
        <span>Nguyên liệu</span>
        <span>Lượng dùng</span>
        <span>Quy cách mua</span>
        <span>Giá mua</span>
        <span>Thành tiền</span>
      </div>
      ${ingredients.map((ingredient) => {
        const stored = savedIngredients[ingredient.id] || {};
        return `
          <div class="lab-cost-row" data-cost-row="${ingredient.id}">
            <strong>${ingredient.name}</strong>
            <span class="lab-cost-used" data-cost-used="${ingredient.id}">0 ${ingredient.unit}</span>
            <label>
              <span>Quy cách mua</span>
              <span class="lab-cost-field">
              <input type="number" min="0.1" step="1" value="${stored.packSize ?? ingredient.packSize}" data-pack-size="${ingredient.id}">
                <small>${ingredient.unit}</small>
              </span>
            </label>
            <label>
              <span>Giá mua</span>
              <span class="lab-cost-field">
              <input type="number" min="0" step="1000" value="${stored.packPrice ?? ingredient.packPrice}" data-pack-price="${ingredient.id}">
                <small>đ</small>
              </span>
            </label>
            <span class="lab-cost-line" data-line-cost="${ingredient.id}">0đ</span>
          </div>
        `;
      }).join("")}
    `;

    if (saved.wasteRate !== undefined) wasteRateInput.value = saved.wasteRate;
    if (saved.yieldCount !== undefined) yieldInput.value = saved.yieldCount;
    if (saved.packagingCost !== undefined) packagingInput.value = saved.packagingCost;
    if (saved.overheadCost !== undefined) overheadInput.value = saved.overheadCost;

    function calculate() {
      let ingredientCost = 0;
      const ingredientSettings = {};

      ingredients.forEach((ingredient) => {
        const used = labState.scaledAmounts[ingredient.id] || 0;
        const packSizeInput = inputRoot.querySelector(`[data-pack-size="${ingredient.id}"]`);
        const packPriceInput = inputRoot.querySelector(`[data-pack-price="${ingredient.id}"]`);
        const packSize = Math.max(0.1, Number(packSizeInput.value) || ingredient.packSize);
        const packPrice = Math.max(0, Number(packPriceInput.value) || 0);
        const lineCost = (used / packSize) * packPrice;

        ingredientSettings[ingredient.id] = { packSize, packPrice };
        ingredientCost += lineCost;
        inputRoot.querySelector(`[data-cost-used="${ingredient.id}"]`).textContent = `${formatAmount(used)} ${ingredient.unit}`;
        inputRoot.querySelector(`[data-line-cost="${ingredient.id}"]`).textContent = formatCurrency(lineCost);
      });

      const wasteRate = Math.min(50, Math.max(0, Number(wasteRateInput.value) || 0));
      const yieldCount = Math.max(1, Math.round(Number(yieldInput.value) || 1));
      const packagingCost = Math.max(0, Number(packagingInput.value) || 0);
      const overheadCost = Math.max(0, Number(overheadInput.value) || 0);
      const costAfterWaste = ingredientCost * (1 + wasteRate / 100);
      const totalCost = costAfterWaste + packagingCost * yieldCount + overheadCost;

      ingredientCostOutput.textContent = formatCurrency(ingredientCost);
      totalCostOutput.textContent = formatCurrency(totalCost);
      unitCostOutput.textContent = formatCurrency(totalCost / yieldCount);

      writeStorage(storageKeys.costs, {
        ingredients: ingredientSettings,
        wasteRate,
        yieldCount,
        packagingCost,
        overheadCost
      });
    }

    inputRoot.addEventListener("input", calculate);
    [wasteRateInput, yieldInput, packagingInput, overheadInput].forEach((input) => {
      input.addEventListener("input", calculate);
    });
    document.addEventListener("charmie:scale-change", calculate);
    calculate();
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

  function initBatchLog() {
    const form = document.querySelector("[data-log-form]");
    const list = document.querySelector("[data-log-list]");
    const empty = document.querySelector("[data-log-empty]");
    const count = document.querySelector("[data-log-count]");
    const clearButton = document.querySelector("[data-clear-logs]");
    const status = document.querySelector("[data-log-status]");
    const dateInput = document.querySelector("[data-log-date]");
    const scaleInput = document.querySelector("[data-log-scale]");
    if (!form || !list || !empty || !count || !clearButton || !dateInput) return;

    let logs = readStorage(storageKeys.logs, []);
    if (!Array.isArray(logs)) logs = [];

    function makeId() {
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
      }
      return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    function formatDate(value) {
      if (!value) return "";
      const parts = value.split("-");
      return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : value;
    }

    function render() {
      count.textContent = `${logs.length} mẻ`;
      empty.hidden = logs.length > 0;
      clearButton.hidden = logs.length === 0;

      list.innerHTML = logs.map((log) => `
        <article class="lab-log-card">
          <div class="lab-log-card-head">
            <div>
              <span>${escapeHtml(formatDate(log.date))} · ${escapeHtml(log.product)}</span>
              <h3>${escapeHtml(log.code)}</h3>
            </div>
            <span class="lab-log-rating" aria-label="${escapeHtml(log.score)} trên 5 điểm">${escapeHtml(log.score)}/5</span>
          </div>
          <dl>
            ${log.scale ? `<div><dt>Quy mô</dt><dd>${escapeHtml(log.scale)}</dd></div>` : ""}
            ${log.temperature ? `<div><dt>Nhiệt độ</dt><dd>${escapeHtml(log.temperature)}</dd></div>` : ""}
            ${log.rest ? `<div><dt>Thời gian nghỉ</dt><dd>${escapeHtml(log.rest)}</dd></div>` : ""}
          </dl>
          ${log.observation ? `<div class="lab-log-copy"><strong>Quan sát</strong><p>${escapeHtml(log.observation)}</p></div>` : ""}
          ${log.next ? `<div class="lab-log-copy"><strong>Mẻ tiếp theo</strong><p>${escapeHtml(log.next)}</p></div>` : ""}
          <button type="button" class="lab-delete-log" data-delete-log="${escapeHtml(log.id)}">Xóa bản ghi</button>
        </article>
      `).join("");
    }

    function resetDefaults() {
      const now = new Date();
      const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
      dateInput.value = localDate.toISOString().slice(0, 10);
      if (scaleInput) {
        scaleInput.value = `${formatAmount(labState.multiplier)} mẻ`;
        scaleInput.dataset.autoScale = "true";
      }
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const log = {
        id: makeId(),
        createdAt: Date.now(),
        date: dateInput.value,
        code: form.querySelector("[data-log-code]").value.trim(),
        product: form.querySelector("[data-log-product]").value,
        scale: form.querySelector("[data-log-scale]").value.trim(),
        temperature: form.querySelector("[data-log-temperature]").value.trim(),
        rest: form.querySelector("[data-log-rest]").value.trim(),
        observation: form.querySelector("[data-log-observation]").value.trim(),
        next: form.querySelector("[data-log-next]").value.trim(),
        score: form.querySelector("[data-log-score]").value
      };

      logs.unshift(log);
      const saved = writeStorage(storageKeys.logs, logs);
      if (!saved) {
        logs.shift();
        status.textContent = "Không thể lưu trên trình duyệt này. Hãy kiểm tra chế độ riêng tư hoặc dung lượng lưu trữ.";
        status.classList.add("is-error");
        return;
      }

      form.reset();
      resetDefaults();
      status.textContent = `Đã lưu mẻ ${log.code}.`;
      status.classList.remove("is-error");
      render();
    });

    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-delete-log]");
      if (!button) return;
      const log = logs.find((item) => item.id === button.dataset.deleteLog);
      if (!log || !window.confirm(`Xóa nhật ký mẻ ${log.code}?`)) return;
      logs = logs.filter((item) => item.id !== log.id);
      writeStorage(storageKeys.logs, logs);
      render();
    });

    clearButton.addEventListener("click", () => {
      if (!logs.length || !window.confirm("Xóa toàn bộ nhật ký mẻ trên thiết bị này?")) return;
      logs = [];
      writeStorage(storageKeys.logs, logs);
      status.textContent = "Đã xóa toàn bộ nhật ký.";
      status.classList.remove("is-error");
      render();
    });

    if (scaleInput) {
      scaleInput.addEventListener("input", () => {
        scaleInput.dataset.autoScale = "false";
      });
    }

    document.addEventListener("charmie:scale-change", () => {
      if (scaleInput && scaleInput.dataset.autoScale !== "false") {
        scaleInput.value = `${formatAmount(labState.multiplier)} mẻ`;
      }
    });

    resetDefaults();
    render();
  }

  initScaler();
  initCosting();
  initDiagnosis();
  initBatchLog();
})();
