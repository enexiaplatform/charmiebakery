const { useState, useEffect, useRef } = React;

/* ── useInView ─────────────────────────────────────────────── */
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) { setVis(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
};

/* ── FadeIn ─────────────────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, className = '', style }) => {
  const [ref, vis] = useInView();
  const s = delay ? { transitionDelay: delay + 'ms', ...style } : style;
  return (
    <div ref={ref} className={`fade-in${vis ? ' vis' : ''}${className ? ' ' + className : ''}`} style={s}>
      {children}
    </div>
  );
};

/* ── Nav ────────────────────────────────────────────────────── */
const Nav = ({ scrolled }) => {
  const go = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
  };
  return (
    <nav className={`c-nav${scrolled ? ' c-nav--up' : ''}`} aria-label="Điều hướng chính">
      <a className="c-nav-logo" href="index.html" aria-label="Charmie — trang chủ">Charmie</a>
      <div className="c-nav-links">
        <a className="c-nav-link c-nav-journal" href="journal/index.html">Journal</a>
        <button className="c-nav-link" onClick={() => go('products')}>Sản phẩm</button>
        <span className="c-nav-sep" aria-hidden="true"></span>
        <button className="c-nav-link c-nav-link--pill" onClick={() => go('order')}>Đặt hàng</button>
      </div>
    </nav>
  );
};

/* ── Hero ───────────────────────────────────────────────────── */
const Hero = ({ layout }) => {
  const go = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
  };
  return (
    <section className={`c-hero c-hero--${layout}`}>
      <div className="c-hero-grain" aria-hidden="true"></div>
      <div className="c-hero-left">
        <FadeIn delay={60}>
          <span className="c-eyebrow">◆ Tiramisu Artisanal · HCMC</span>
        </FadeIn>
        <FadeIn delay={180}>
          <h1 className="c-hero-wordmark">Charmie</h1>
        </FadeIn>
        <FadeIn delay={300}>
          <p className="c-hero-tagline">Made with love, wrapped in warmth</p>
        </FadeIn>
        <FadeIn delay={420}>
          <p className="c-hero-copy">
            Những hộp tiramisu thủ công — làm từ nguyên liệu chọn lọc,
            gói trong từng khoảnh khắc ấm áp. Dành để tặng. Dành để nhớ.
          </p>
        </FadeIn>
        <FadeIn delay={540}>
          <div className="c-hero-btns">
            <button className="c-btn c-btn-fill" onClick={() => go('products')}>Xem sản phẩm</button>
            <button className="c-btn c-btn-ring" onClick={() => go('order')}>Đặt hàng ngay</button>
          </div>
        </FadeIn>
      </div>
      <div className="c-hero-right">
        <div className="c-hero-img-wrap">
          <div className="c-hero-img-ring"></div>
          <div className="c-hero-img">
            <img src="uploads/pasted-1779543950628-0.jpg" alt="Tiramisu Charmie bên tách espresso và hoa hồng khô" width="1254" height="1254" fetchPriority="high" decoding="async" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}} />
          </div>
        </div>
        <div className="c-hero-dot c-hero-dot--a"></div>
        <div className="c-hero-dot c-hero-dot--b"></div>
      </div>
      <div className="c-hero-scroll" aria-hidden="true">
        <span className="c-hero-scroll-lbl">cuộn xuống</span>
        <span className="c-hero-scroll-line"></span>
      </div>
    </section>
  );
};

/* ── Statement ──────────────────────────────────────────────── */
const Statement = () => (
  <section className="c-stmt">
    <div className="c-wrap">
      <FadeIn className="c-stmt-inner">
        <div className="c-stmt-ornament" aria-hidden="true">◆</div>
        <p className="c-stmt-text">
          Làm bằng tay.{' '}
          <em className="c-stmt-em">Gói bằng tâm.</em>
        </p>
        <span className="c-stmt-sig">— Charmie, Ho Chi Minh City</span>
      </FadeIn>
    </div>
  </section>
);

/* ── Brand Story ────────────────────────────────────────────── */
const FEATS = [
  { icon: '🍵', name: 'Nguyên liệu chọn lọc', note: 'Mascarpone Ý, espresso chuẩn pha' },
  { icon: '🎁', name: 'Thiết kế để tặng',     note: 'Bao bì cao cấp, ribbon tùy chọn' },
  { icon: '❄️', name: 'Giao tận nơi',          note: 'Ahamove & Grab Express, toàn TP.HCM' },
];

const BrandStory = () => (
  <section className="c-story">
    <div className="c-wrap">
      <div className="c-story-grid">
        <FadeIn className="c-story-left">
          <div className="c-story-qmark" aria-hidden="true">"</div>
          <h2 className="c-story-h2">Mỗi hộp là một ký ức nhỏ.</h2>
          <p className="c-story-p">
            Charmie bắt đầu từ một buổi chiều trong bếp nhỏ — khi tôi muốn gửi
            đến người thân một điều gì đó chân thực hơn lời chúc. Tiramisu,
            với từng lớp kem mịn và espresso đậm đà, trở thành ngôn ngữ riêng của tôi.
          </p>
          <p className="c-story-p">
            Mỗi hộp được làm tay, từng chiếc một — không dây chuyền, không vội vàng.
            Chỉ có những nguyên liệu chọn lọc, và rất nhiều tâm ý.
          </p>
        </FadeIn>
        <FadeIn delay={160} className="c-story-right">
          <div className="c-feats">
            {FEATS.map((f, i) => (
              <div key={i} className="c-feat">
                <span className="c-feat-icon" aria-hidden="true">{f.icon}</span>
                <div>
                  <div className="c-feat-name">{f.name}</div>
                  <div className="c-feat-note">{f.note}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

/* ── Products ───────────────────────────────────────────────── */
const JOURNAL_FEATURES = [
  {
    level: 'Nền tảng',
    title: 'Đọc một chiếc tiramisu qua từng lớp',
    desc: 'Hiểu vai trò của bánh, espresso, mascarpone và cacao trước khi bắt đầu.',
    img: 'uploads/pasted-1779543950628-0.jpg',
    href: 'journal/tiramisu-la-gi/',
  },
  {
    level: 'Khoa học',
    title: 'Tiramisu dưới góc nhìn khoa học',
    desc: 'Nhũ tương, bọt khí, mao dẫn và sự di chuyển của độ ẩm trong thời gian nghỉ.',
    img: 'uploads/pasted-1779544083977-0.jpg',
    href: 'journal/khoa-hoc-cua-tiramisu/',
  },
  {
    level: 'Nâng cao',
    title: 'An toàn và chuỗi lạnh',
    desc: 'Trứng thanh trùng, bảo quản lạnh và những nguyên tắc cần có khi làm để bán.',
    img: 'uploads/pasted-1779544702147-0.jpg',
    href: 'journal/an-toan-va-chuoi-lanh/',
  },
];

const JournalPreview = () => (
  <section id="journal" className="c-journal">
    <div className="c-wrap">
      <FadeIn className="c-journal-head">
        <div>
          <span className="c-eyebrow">◆ Charmie Journal</span>
          <h2 className="c-journal-title">Hiểu tiramisu từ bên trong.</h2>
          <p className="c-journal-copy">
            Từ nền tảng đến khoa học thực phẩm — những ghi chép giúp bạn làm bánh
            bằng quan sát, lý giải và một quy trình có thể lặp lại.
          </p>
        </div>
        <a className="c-btn c-btn-ring c-journal-all" href="journal/index.html">Xem thư viện</a>
      </FadeIn>

      <div className="c-journal-grid">
        {JOURNAL_FEATURES.map((article, index) => (
          <FadeIn key={article.href} delay={index * 100}>
            <a className="c-journal-card" href={article.href}>
              <div className="c-journal-img">
                <img src={article.img} alt={article.title} loading="lazy" decoding="async" />
              </div>
              <div className="c-journal-body">
                <span>{article.level}</span>
                <h3>{article.title}</h3>
                <p>{article.desc}</p>
                <strong>Đọc bài →</strong>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const PRODS = [
  { id:1, name:'Le Classique', desc:'Tiramisu cổ điển. Đậm espresso, kem mascarpone mịn màng.',                     price:'320,000đ', wt:'~250g', badge:'Best Seller', bk:'bs', img:'uploads/pasted-1779543992358-0.jpg' },
  { id:2, name:'Jardin Vert',  desc:'Matcha Uji hòa quyện cùng mascarpone — thanh mát, tinh tế.',                   price:'360,000đ', wt:'~250g', img:'uploads/pasted-1779544083977-0.jpg' },
  { id:3, name:'Charmie Box',  desc:'Hộp quà hero. Bao bì premium, ribbon tùy chọn. Dành cho những dịp đặc biệt.',  price:'480,000đ', wt:'~400g', badge:'Best Seller', bk:'bs', img:'uploads/pasted-1779544236945-0.jpg' },
  { id:4, name:'Soft Letters', desc:'Phiên bản giới hạn. Mở đặt hàng 15/1/2027.',                                    price:'520,000đ', wt:'~400g', badge:'Limited', bk:'ltd', sub:'Valentine Limited 2027', star:true, img:'uploads/pasted-1779544702147-0.jpg' },
];

const PCard = ({ p, cs, di }) => (
  <FadeIn delay={di * 80} className={`c-card${p.star ? ' c-card--star' : ''} c-card--${cs}`}>
    <div className="c-card-img">
      {p.img
        ? <img src={p.img} alt={`Hộp tiramisu ${p.name}`} loading="lazy" decoding="async" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center center'}} />
        : <span>[Product Photo]</span>
      }
    </div>
    {p.badge && <span className={`c-card-badge c-card-badge--${p.bk}`}>{p.badge}</span>}
    <div className="c-card-bd">
      {p.sub && <div className="c-card-sub">{p.sub}</div>}
      <h3 className="c-card-name">{p.name}</h3>
      <p className="c-card-desc">{p.desc}</p>
      <div className="c-card-ft">
        <div>
          <div className="c-card-price">{p.price}</div>
          <div className="c-card-wt">{p.wt}</div>
        </div>
        <button className="c-btn c-btn-ghost" onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })} aria-label={`Đặt hàng ${p.name}`}>Đặt hàng</button>
      </div>
    </div>
  </FadeIn>
);

const Products = ({ cs }) => {
  const trackRef = useRef(null);
  const [prog, setProg] = useState(0);
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProg(max > 0 ? el.scrollLeft / max : 0);
  };
  const pan = dir => trackRef.current?.scrollBy({ left: dir * 308, behavior: 'smooth' });

  return (
    <section id="products" className="c-prods">
      <div className="c-wrap">
        <FadeIn className="c-sechd-row">
          <div>
            <h2 className="c-sec-title">Bộ sưu tập</h2>
            <p className="c-sec-sub">Chọn hộp phù hợp với khoảnh khắc của bạn.</p>
          </div>
          <div className="c-prods-arrows">
            <button className="c-arrow" onClick={() => pan(-1)} aria-label="Trước">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="c-arrow" onClick={() => pan(1)} aria-label="Sau">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </FadeIn>
      </div>
      <div className="c-prods-track" ref={trackRef} onScroll={onScroll}>
        <div className="c-prods-pad"></div>
        {PRODS.map((p, i) => <PCard key={p.id} p={p} cs={cs} di={i} />)}
        <div className="c-prods-pad"></div>
      </div>
      <div className="c-wrap">
        <div className="c-prods-bar">
          <div className="c-prods-bar-fill" style={{ width: (prog * 100) + '%' }}></div>
        </div>
      </div>
    </section>
  );
};

/* ── Customizer ────────────────────────────────────────────── */
const Customizer = () => {
  const [base, setBase] = useState('classique'); // 'classique' | 'matcha'
  const [sweetness, setSweetness] = useState('vừa'); // 'nhạt' | 'vừa' | 'đậm'
  const [strength, setStrength] = useState('vừa'); // 'nhẹ' | 'vừa' | 'đậm'
  const [cream, setCream] = useState('cổ điển'); // 'thanh' | 'cổ điển' | 'béo'
  const [dust, setDust] = useState('vừa'); // 'mỏng' | 'vừa' | 'dày'
  const [alcohol, setAlcohol] = useState('thoảng'); // 'không' | 'thoảng' | 'đậm'
  const [copied, setCopied] = useState(false);

  // Greeting Card States
  const [addCard, setAddCard] = useState(false);
  const [cardTheme, setCardTheme] = useState('ivory'); // 'ivory' | 'blush' | 'forest' | 'gold'
  const [cardTo, setCardTo] = useState('');
  const [cardFrom, setCardFrom] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [cardTemplate, setCardTemplate] = useState('custom'); // 'custom' | 'birthday' | 'thankyou' | 'love'
  const [previewTab, setPreviewTab] = useState('cake'); // 'cake' | 'card' | 'gift'

  // Gifting & Accessories States
  const [addGift, setAddGift] = useState(false);
  const [ribbonColor, setRibbonColor] = useState('cream'); // 'cream' | 'blush' | 'forest' | 'espresso'
  const [candleType, setCandleType] = useState('none'); // 'none' | 'artistic' | 'basic' | 'number'
  const [candleDigit, setCandleDigit] = useState('5'); // '0'-'9'
  const [accSpoon, setAccSpoon] = useState(false);
  const [accBag, setAccBag] = useState(false);

  const templates = {
    custom: '',
    birthday: 'Chúc mừng sinh nhật! Tuổi mới thật nhiều niềm vui, ngọt ngào và hạnh phúc trọn vẹn nhé.',
    thankyou: 'Cảm ơn vì đã luôn đồng hành, chia sẻ và giúp đỡ mình. Mẻ bánh ngọt ngào này thay lời muốn nói.',
    love: 'Gửi những điều ngọt ngào nhất tới người đặc biệt của mình. Thương yêu và trân trọng mỗi phút giây bên nhau.'
  };

  const handleTemplateChange = (type) => {
    setCardTemplate(type);
    if (type !== 'custom') {
      setCardMessage(templates[type]);
    }
  };

  const cardThemeLabel = (theme) => {
    if (theme === 'ivory') return 'Classic Ivory';
    if (theme === 'blush') return 'Rose Blush';
    if (theme === 'forest') return 'Forest Green';
    return 'Midnight Gold';
  };

  const ribbonLabel = (color) => {
    if (color === 'cream') return 'Classic Cream';
    if (color === 'blush') return 'Rose Blush';
    if (color === 'forest') return 'Forest Green';
    return 'Espresso Brown';
  };

  const candleLabel = (type, digit) => {
    if (type === 'none') return 'Không lấy nến';
    if (type === 'artistic') return 'Nến xoắn nghệ thuật';
    if (type === 'basic') return 'Nến sinh nhật basic';
    return `Nến số ${digit}`;
  };

  // Set alcohol to 'không' if base is matcha
  useEffect(() => {
    if (base === 'matcha') {
      setAlcohol('không');
    }
  }, [base]);

  // Option labels
  const baseLabel = base === 'classique' ? 'Le Classique' : 'Jardin Vert';
  const sweetnessLabel = sweetness === 'nhạt' ? 'Nhạt (Thanh nhẹ)' : sweetness === 'vừa' ? 'Vừa (Cổ điển)' : 'Đậm vị';
  const strengthLabel = base === 'classique' 
    ? (strength === 'nhẹ' ? 'Nhẹ nhàng' : strength === 'vừa' ? 'Đậm đà' : 'Cực đậm')
    : (strength === 'nhẹ' ? 'Thoảng matcha' : strength === 'vừa' ? 'Matcha vừa' : 'Đậm matcha');
  const creamLabel = cream === 'thanh' ? 'Thanh nhẹ (Sữa nhiều)' : cream === 'cổ điển' ? 'Mượt mà (Cổ điển)' : 'Béo ngậy (Siêu béo)';
  const dustLabel = dust === 'mỏng' ? 'Phủ mỏng' : dust === 'vừa' ? 'Vừa đủ' : 'Phủ dày';
  const alcoholLabel = alcohol === 'không' ? 'Không cồn' : alcohol === 'thoảng' ? 'Thoảng nhẹ' : 'Đậm chất (Rum)';

  // Calculate layer heights
  const dustPct = dust === 'mỏng' ? 6 : dust === 'vừa' ? 10 : 15;
  const creamPct = cream === 'thanh' ? 40 : cream === 'cổ điển' ? 48 : 55;
  const biscuitPct = 100 - dustPct - creamPct;

  // Code string e.g. CLASSIC-S1-ST2-C2-D2-A1
  const baseCode = base === 'classique' ? 'CLS' : 'JDV';
  const sweetnessCode = sweetness === 'nhạt' ? 'S1' : sweetness === 'vừa' ? 'S2' : 'S3';
  const strengthCode = strength === 'nhẹ' ? 'ST1' : strength === 'vừa' ? 'ST2' : 'ST3';
  const creamCode = cream === 'thanh' ? 'CR1' : cream === 'cổ điển' ? 'CR2' : 'CR3';
  const dustCode = dust === 'mỏng' ? 'D1' : dust === 'vừa' ? 'D2' : 'D3';
  const alcoholCode = alcohol === 'không' ? 'A0' : alcohol === 'thoảng' ? 'A1' : 'A2';
  
  const ribbonCode = addGift ? (ribbonColor === 'cream' ? 'R1' : ribbonColor === 'blush' ? 'R2' : ribbonColor === 'forest' ? 'R3' : 'R4') : 'R0';
  const candleCode = addGift ? (candleType === 'none' ? 'C0' : candleType === 'artistic' ? 'C1' : candleType === 'basic' ? 'C2' : `C3${candleDigit}`) : 'C0';
  const spoonCode = addGift ? (accSpoon ? 'SP1' : 'SP0') : 'SP0';
  const bagCode = addGift ? (accBag ? 'BG1' : 'BG0') : 'BG0';

  const customCode = `${baseCode}-${sweetnessCode}-${strengthCode}-${creamCode}-${dustCode}-${alcoholCode}-${ribbonCode}-${candleCode}-${spoonCode}-${bagCode}`;

  // Description generator
  const getSweetnessDesc = () => {
    if (sweetness === 'nhạt') return 'độ ngọt thanh dịu (giảm 30% đường)';
    if (sweetness === 'vừa') return 'vị ngọt dịu cân bằng cổ điển';
    return 'vị ngọt ngào sâu lắng đậm đà';
  };
  const getStrengthDesc = () => {
    if (base === 'classique') {
      if (strength === 'nhẹ') return 'hương espresso loãng thoảng nhẹ tinh tế';
      if (strength === 'vừa') return 'espresso đậm đà được pha chế kỹ lưỡng';
      return 'cốt cà phê cực đậm (double shot) bừng tỉnh';
    } else {
      if (strength === 'nhẹ') return 'hương trà xanh Uji dịu thanh';
      if (strength === 'vừa') return 'vị trà chát nhẹ nguyên bản';
      return 'độ chát rõ rệt của matcha đậm đặc';
    }
  };
  const getCreamDesc = () => {
    if (cream === 'thanh') return 'kết cấu kem sữa thanh nhẹ thoáng mát';
    if (cream === 'cổ điển') return 'lớp kem mascarpone mượt mà sánh mịn';
    return 'kem mascarpone siêu béo ngậy đặc sánh';
  };
  const getDustDesc = () => {
    if (dust === 'mỏng') return 'bột phủ mỏng nhẹ nhàng';
    if (dust === 'vừa') return 'bột rây vừa đủ tinh tế';
    return 'bột rây dày đắng thơm cuốn hút';
  };
  const getAlcoholDesc = () => {
    if (alcohol === 'không') return 'quy trình hoàn toàn không cồn';
    if (alcohol === 'thoảng') return 'thoảng hương rượu ấm nồng';
    return 'đậm đà hương vị rượu Rum nồng nàn';
  };

  const getProfileTitle = () => {
    if (sweetness === 'nhạt' && strength === 'đậm') return 'Bản Phối Bản Lĩnh (Bold & Calm)';
    if (cream === 'béo' && alcohol === 'đậm') return 'Bản Phối Nồng Nàn (Warm Velvet)';
    if (sweetness === 'đậm' && cream === 'thanh') return 'Bản Phối Kẹo Ngọt (Sweet Cloud)';
    if (cream === 'béo' && strength === 'đậm') return 'Bản Phối Tương Phản (Double Rich)';
    return `Bản Phối Cá Nhân ${customCode}`;
  };

  let tasteDescription = `Mẻ Tiramisu được chế tác thủ công theo yêu cầu của bạn, mang ${getSweetnessDesc()}. Lớp ladyfingers thấm ${getStrengthDesc()}, kết hợp cùng ${getCreamDesc()} bồng bềnh. Bánh được hoàn thiện với lớp ${getDustDesc()} trên bề mặt, đi kèm ${getAlcoholDesc()}.`;
  if (addGift) {
    tasteDescription += ` Bánh được bọc ruy-băng ${ribbonLabel(ribbonColor).toLowerCase()} sang trọng, đi kèm ${candleLabel(candleType, candleDigit).toLowerCase()}.`;
  }

  let orderText = `Chào Charmie, mình muốn đặt Tiramisu tùy chỉnh:
- Mã bản phối: ${customCode}
- Tên bản phối: ${getProfileTitle()}
- Vị nền: ${baseLabel}
- Độ ngọt: ${sweetnessLabel}
- ${base === 'classique' ? 'Cà phê' : 'Matcha'}: ${strengthLabel}
- Độ béo kem: ${creamLabel}
- Lớp bột phủ: ${dustLabel}
- Rượu thơm: ${alcoholLabel}`;

  if (addCard) {
    orderText += `
- Thiệp đi kèm: Có (${cardThemeLabel(cardTheme)})
- Gửi đến (To): ${cardTo.trim() || '(Để trống)'}
- Gửi từ (From): ${cardFrom.trim() || '(Để trống)'}
- Lời nhắn: ${cardMessage.trim() || '(Để trống)'}`;
  }

  if (addGift) {
    const accList = [];
    if (accSpoon) accList.push('Muỗng gỗ & Đĩa giấy');
    if (accBag) accList.push('Túi giấy quà tặng cao cấp');
    const accStr = accList.join(', ') || 'Không lấy';

    orderText += `
- Hộp quà & Phụ kiện: Gói quà cao cấp
- Ruy-băng gói: ${ribbonLabel(ribbonColor)}
- Nến sinh nhật: ${candleLabel(candleType, candleDigit)}
- Phụ kiện thêm: ${accStr}`;
  } else {
    orderText += `
- Hộp quà & Phụ kiện: Hộp tiêu chuẩn`;
  }

  const ribbonHex = {
    cream: '#E8D9C4',
    blush: '#E8C1BD',
    forest: '#8FA88B',
    espresso: '#7B5E52'
  }[ribbonColor];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="customizer" className="c-customizer">
      <div className="c-wrap">
        <FadeIn className="c-sechd" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="c-eyebrow">◆ Charmie Customizer</span>
          <h2 className="c-sec-title">Cá nhân hóa mẻ Tiramisu</h2>
          <p className="c-sec-sub" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Chúng tôi hiểu mỗi thực khách có một gu thưởng thức riêng. Hãy tùy chọn hương vị lý tưởng, chúng tôi sẽ làm thủ công mẻ bánh của riêng bạn.
          </p>
        </FadeIn>

        <div className="c-cust-grid">
          {/* Controls */}
          <FadeIn className="c-cust-controls" delay={80}>
            {/* Base Selector */}
            <div className="c-cust-group">
              <div className="c-cust-label">Hương vị nền <span>{baseLabel}</span></div>
              <div className="c-cust-options">
                <button type="button" className={`c-cust-btn ${base === 'classique' ? 'active' : ''}`} onClick={() => setBase('classique')}>Le Classique (Cà phê)</button>
                <button type="button" className={`c-cust-btn ${base === 'matcha' ? 'active' : ''}`} onClick={() => setBase('matcha')}>Jardin Vert (Matcha)</button>
              </div>
            </div>

            {/* Sweetness */}
            <div className="c-cust-group">
              <div className="c-cust-label">Độ ngọt <span>{sweetnessLabel}</span></div>
              <div className="c-cust-options">
                <button type="button" className={`c-cust-btn ${sweetness === 'nhạt' ? 'active' : ''}`} onClick={() => setSweetness('nhạt')}>Nhạt</button>
                <button type="button" className={`c-cust-btn ${sweetness === 'vừa' ? 'active' : ''}`} onClick={() => setSweetness('vừa')}>Vừa (Cổ điển)</button>
                <button type="button" className={`c-cust-btn ${sweetness === 'đậm' ? 'active' : ''}`} onClick={() => setSweetness('đậm')}>Đậm vị</button>
              </div>
            </div>

            {/* Strength */}
            <div className="c-cust-group">
              <div className="c-cust-label">{base === 'classique' ? 'Độ đậm cà phê' : 'Độ đậm Matcha'} <span>{strengthLabel}</span></div>
              <div className="c-cust-options">
                <button type="button" className={`c-cust-btn ${strength === 'nhẹ' ? 'active' : ''}`} onClick={() => setStrength('nhẹ')}>Thoảng nhẹ</button>
                <button type="button" className={`c-cust-btn ${strength === 'vừa' ? 'active' : ''}`} onClick={() => setStrength('vừa')}>Vừa phải</button>
                <button type="button" className={`c-cust-btn ${strength === 'đậm' ? 'active' : ''}`} onClick={() => setStrength('đậm')}>Đậm đặc</button>
              </div>
            </div>

            {/* Cream */}
            <div className="c-cust-group">
              <div className="c-cust-label">Độ ngậy kem <span>{creamLabel}</span></div>
              <div className="c-cust-options">
                <button type="button" className={`c-cust-btn ${cream === 'thanh' ? 'active' : ''}`} onClick={() => setCream('thanh')}>Thanh nhẹ</button>
                <button type="button" className={`c-cust-btn ${cream === 'cổ điển' ? 'active' : ''}`} onClick={() => setCream('cổ điển')}>Cổ điển</button>
                <button type="button" className={`c-cust-btn ${cream === 'béo' ? 'active' : ''}`} onClick={() => setCream('béo')}>Béo ngậy</button>
              </div>
            </div>

            {/* Dust */}
            <div className="c-cust-group">
              <div className="c-cust-label">Lớp bột phủ mặt <span>{dustLabel}</span></div>
              <div className="c-cust-options">
                <button type="button" className={`c-cust-btn ${dust === 'mỏng' ? 'active' : ''}`} onClick={() => setDust('mỏng')}>Phủ mỏng</button>
                <button type="button" className={`c-cust-btn ${dust === 'vừa' ? 'active' : ''}`} onClick={() => setDust('vừa')}>Vừa đủ</button>
                <button type="button" className={`c-cust-btn ${dust === 'dày' ? 'active' : ''}`} onClick={() => setDust('dày')}>Phủ dày</button>
              </div>
            </div>

            {/* Alcohol (Only for Classique) */}
            {base === 'classique' && (
              <div className="c-cust-group">
                <div className="c-cust-label">Hương vị rượu <span>{alcoholLabel}</span></div>
                <div className="c-cust-options">
                  <button type="button" className={`c-cust-btn ${alcohol === 'không' ? 'active' : ''}`} onClick={() => setAlcohol('không')}>Không cồn</button>
                  <button type="button" className={`c-cust-btn ${alcohol === 'thoảng' ? 'active' : ''}`} onClick={() => setAlcohol('thoảng')}>Thoảng nhẹ</button>
                  <button type="button" className={`c-cust-btn ${alcohol === 'đậm' ? 'active' : ''}`} onClick={() => setAlcohol('đậm')}>Đậm vị (Rum)</button>
                </div>
              </div>
            )}

            {/* Greeting Card Toggle */}
            <div className="c-cust-group" style={{ borderTop: '1px dashed var(--champagne)', paddingTop: '24px' }}>
              <div className="c-cust-label">Thiệp chúc mừng đi kèm <span>{addCard ? 'Đã thêm (Miễn phí)' : 'Chưa dùng'}</span></div>
              <div className="c-cust-options">
                <button type="button" className={`c-cust-btn ${!addCard ? 'active' : ''}`} onClick={() => { setAddCard(false); setPreviewTab('cake'); }}>Không dùng thiệp</button>
                <button type="button" className={`c-cust-btn ${addCard ? 'active' : ''}`} onClick={() => { setAddCard(true); setPreviewTab('card'); }}>Viết thiệp tặng kèm</button>
              </div>
            </div>

            {/* Greeting Card Fields (Conditional) */}
            {addCard && (
              <div className="c-cust-card-fields">
                {/* Card Theme */}
                <div className="c-cust-group">
                  <div className="c-cust-label" style={{ fontSize: '13px' }}>Thiết kế thiệp <span>{cardThemeLabel(cardTheme)}</span></div>
                  <div className="c-cust-options">
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${cardTheme === 'ivory' ? 'active' : ''}`} onClick={() => setCardTheme('ivory')}>Ivory</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${cardTheme === 'blush' ? 'active' : ''}`} onClick={() => setCardTheme('blush')}>Blush</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${cardTheme === 'forest' ? 'active' : ''}`} onClick={() => setCardTheme('forest')}>Forest</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${cardTheme === 'gold' ? 'active' : ''}`} onClick={() => setCardTheme('gold')}>Midnight</button>
                  </div>
                </div>

                {/* Message templates */}
                <div className="c-cust-group" style={{ marginTop: '16px' }}>
                  <div className="c-cust-label" style={{ fontSize: '13px' }}>Lời chúc mẫu</div>
                  <div className="c-cust-options">
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${cardTemplate === 'custom' ? 'active' : ''}`} onClick={() => handleTemplateChange('custom')}>Tự viết</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${cardTemplate === 'birthday' ? 'active' : ''}`} onClick={() => handleTemplateChange('birthday')}>Sinh nhật</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${cardTemplate === 'thankyou' ? 'active' : ''}`} onClick={() => handleTemplateChange('thankyou')}>Cảm ơn</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${cardTemplate === 'love' ? 'active' : ''}`} onClick={() => handleTemplateChange('love')}>Tình yêu</button>
                  </div>
                </div>

                {/* Sender & Recipient */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                  <div className="c-cust-group">
                    <label className="c-cust-input-label" htmlFor="card-to">Gửi đến (To)</label>
                    <input 
                      id="card-to"
                      type="text" 
                      placeholder="Tên người nhận..." 
                      className="c-cust-text-input" 
                      value={cardTo} 
                      onChange={(e) => setCardTo(e.target.value)}
                      maxLength={30}
                    />
                  </div>
                  <div className="c-cust-group">
                    <label className="c-cust-input-label" htmlFor="card-from">Gửi từ (From)</label>
                    <input 
                      id="card-from"
                      type="text" 
                      placeholder="Tên bạn..." 
                      className="c-cust-text-input" 
                      value={cardFrom} 
                      onChange={(e) => setCardFrom(e.target.value)}
                      maxLength={30}
                    />
                  </div>
                </div>

                {/* Message Body */}
                <div className="c-cust-group" style={{ marginTop: '16px' }}>
                  <label className="c-cust-input-label" htmlFor="card-msg">Nội dung lời nhắn</label>
                  <textarea 
                    id="card-msg"
                    placeholder="Nhập lời chúc chân thành của bạn..." 
                    rows={3} 
                    className="c-cust-textarea" 
                    value={cardMessage} 
                    onChange={(e) => {
                      setCardMessage(e.target.value);
                      setCardTemplate('custom');
                    }}
                    maxLength={200}
                  />
                  <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--mocha)', marginTop: '4px' }}>
                    {cardMessage.length}/200 ký tự
                  </div>
                </div>
              </div>
            )}

            {/* Gifting & Accessories Toggle */}
            <div className="c-cust-group" style={{ borderTop: '1px dashed var(--champagne)', paddingTop: '24px' }}>
              <div className="c-cust-label">Gói quà & Phụ kiện <span>{addGift ? 'Đã thêm (Cao cấp)' : 'Chưa dùng'}</span></div>
              <div className="c-cust-options">
                <button type="button" className={`c-cust-btn ${!addGift ? 'active' : ''}`} onClick={() => { setAddGift(false); setPreviewTab('cake'); }}>Hộp tiêu chuẩn</button>
                <button type="button" className={`c-cust-btn ${addGift ? 'active' : ''}`} onClick={() => { setAddGift(true); setPreviewTab('gift'); }}>Gói quà cao cấp</button>
              </div>
            </div>

            {/* Gifting Details (Conditional) */}
            {addGift && (
              <div className="c-cust-card-fields">
                {/* Ribbon Color */}
                <div className="c-cust-group">
                  <div className="c-cust-label" style={{ fontSize: '13px' }}>Màu ruy-băng gói hộp <span>{ribbonLabel(ribbonColor)}</span></div>
                  <div className="c-cust-options">
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${ribbonColor === 'cream' ? 'active' : ''}`} onClick={() => setRibbonColor('cream')}>Cream</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${ribbonColor === 'blush' ? 'active' : ''}`} onClick={() => setRibbonColor('blush')}>Blush</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${ribbonColor === 'forest' ? 'active' : ''}`} onClick={() => setRibbonColor('forest')}>Forest</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${ribbonColor === 'espresso' ? 'active' : ''}`} onClick={() => setRibbonColor('espresso')}>Espresso</button>
                  </div>
                </div>

                {/* Candle Type */}
                <div className="c-cust-group" style={{ marginTop: '16px' }}>
                  <div className="c-cust-label" style={{ fontSize: '13px' }}>Chọn nến tặng kèm <span>{candleLabel(candleType, candleDigit)}</span></div>
                  <div className="c-cust-options">
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${candleType === 'none' ? 'active' : ''}`} onClick={() => setCandleType('none')}>Không lấy</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${candleType === 'artistic' ? 'active' : ''}`} onClick={() => setCandleType('artistic')}>Nến xoắn</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${candleType === 'basic' ? 'active' : ''}`} onClick={() => setCandleType('basic')}>Nến basic</button>
                    <button type="button" className={`c-cust-btn c-cust-btn--sm ${candleType === 'number' ? 'active' : ''}`} onClick={() => setCandleType('number')}>Nến số</button>
                  </div>
                </div>

                {/* Candle Digit (Conditional) */}
                {candleType === 'number' && (
                  <div className="c-cust-group" style={{ marginTop: '12px' }}>
                    <div className="c-cust-label" style={{ fontSize: '12px' }}>Chọn số nến</div>
                    <div className="c-cust-options">
                      {['0','1','2','3','4','5','6','7','8','9'].map(d => (
                        <button 
                          key={d} 
                          type="button" 
                          className={`c-cust-btn c-cust-btn--xs ${candleDigit === d ? 'active' : ''}`} 
                          onClick={() => setCandleDigit(d)}
                          style={{ minWidth: '32px', flex: 'initial', padding: '6px' }}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accessories checkboxes */}
                <div className="c-cust-group" style={{ marginTop: '16px' }}>
                  <div className="c-cust-label" style={{ fontSize: '13px' }}>Đồ đi kèm thêm</div>
                  <div className="c-cust-options">
                    <button 
                      type="button" 
                      className={`c-cust-btn c-cust-btn--sm ${accSpoon ? 'active' : ''}`} 
                      onClick={() => setAccSpoon(!accSpoon)}
                    >
                      {accSpoon ? '✓ Muỗng gỗ & Đĩa' : 'Muỗng gỗ & Đĩa (Free)'}
                    </button>
                    <button 
                      type="button" 
                      className={`c-cust-btn c-cust-btn--sm ${accBag ? 'active' : ''}`} 
                      onClick={() => setAccBag(!accBag)}
                    >
                      {accBag ? '✓ Túi giấy quà tặng' : 'Túi giấy cao cấp'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </FadeIn>

          {/* Preview Card */}
          <FadeIn className="c-cust-preview" delay={160}>
            {/* Tabs for preview switching */}
            <div className="c-cust-tabs">
              <button 
                type="button" 
                className={`c-cust-tab ${previewTab === 'cake' ? 'active' : ''}`}
                onClick={() => setPreviewTab('cake')}
              >
                Mẻ bánh của bạn
              </button>
              <button 
                type="button" 
                className={`c-cust-tab ${previewTab === 'card' ? 'active' : ''}`}
                onClick={() => {
                  setPreviewTab('card');
                  if (!addCard) setAddCard(true);
                }}
              >
                Thiệp chúc mừng {addCard && <span className="tab-indicator">•</span>}
              </button>
              <button 
                type="button" 
                className={`c-cust-tab ${previewTab === 'gift' ? 'active' : ''}`}
                onClick={() => {
                  setPreviewTab('gift');
                  if (!addGift) setAddGift(true);
                }}
              >
                Hộp & Phụ kiện {addGift && <span className="tab-indicator">•</span>}
              </button>
            </div>

            {previewTab === 'cake' ? (
              /* Visualizer */
              <div className="c-cust-visual">
                <div className={`c-layer-ladyfingers ${base === 'matcha' ? 'matcha' : ''}`} style={{ height: biscuitPct + '%' }}>
                  Ladyfingers ({strengthLabel})
                </div>
                <div className="c-layer-cream" style={{ height: creamPct + '%' }}>
                  Kem Mascarpone ({cream === 'thanh' ? 'Thanh' : cream === 'cổ điển' ? 'Mượt' : 'Béo'})
                </div>
                <div className={`c-layer-dust ${base === 'matcha' ? 'matcha' : ''}`} style={{ height: dustPct + '%' }}>
                  {base === 'classique' ? 'Cacao' : 'Matcha'} ({dustLabel})
                </div>
              </div>
            ) : previewTab === 'card' ? (
              /* Greeting Card Preview */
              <div className={`c-cust-card-preview theme-${cardTheme}`}>
                <div className="c-cust-card-inner">
                  <div className="c-cust-card-corner top-left"></div>
                  <div className="c-cust-card-corner top-right"></div>
                  <div className="c-cust-card-corner bottom-left"></div>
                  <div className="c-cust-card-corner bottom-right"></div>
                  
                  <div className="c-cust-card-content">
                    {cardTo && <div className="c-cust-card-to">Gửi: {cardTo}</div>}
                    <div className="c-cust-card-body">{cardMessage || 'Hãy điền lời nhắn ngọt ngào của bạn gửi kèm ổ bánh tiramisu nghệ thuật...'}</div>
                    {cardFrom && <div className="c-cust-card-from">Từ: {cardFrom}</div>}
                  </div>
                  
                  <div className="c-cust-card-footer">
                    <span>Charmie Bakery — Dành để tặng, dành để nhớ</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Gift Pack Preview */
              <div className="c-cust-gift-preview" style={{ '--ribbon-color': ribbonHex }}>
                <div className="c-gift-box-wrapper">
                  <div className="c-gift-box-lid"></div>
                  <div className="c-gift-box">
                    <div className="c-gift-ribbon-v"></div>
                    <div className="c-gift-ribbon-h"></div>
                    <div className="c-gift-bow">
                      <div className="c-gift-bow-left"></div>
                      <div className="c-gift-bow-right"></div>
                      <div className="c-gift-bow-center"></div>
                    </div>
                    <div className="c-gift-tag">
                      <span>C</span>
                    </div>
                  </div>
                </div>
                
                <div className="c-gift-accessories-list">
                  {candleType !== 'none' && (
                    <div className="c-gift-acc-badge">
                      🕯️ {candleLabel(candleType, candleDigit)}
                    </div>
                  )}
                  {accSpoon && <div className="c-gift-acc-badge">🥄 Muỗng gỗ & đĩa</div>}
                  {accBag && <div className="c-gift-acc-badge">🛍️ Túi giấy cao cấp</div>}
                  {!accSpoon && !accBag && candleType === 'none' && (
                    <div className="c-gift-acc-badge" style={{ opacity: 0.6 }}>
                      Hộp quà thắt ruy-băng
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="c-cust-meta">
              <span className="c-cust-badge">Gu của bạn</span>
              <h3 className="c-cust-title">{getProfileTitle()}</h3>
              <p className="c-cust-desc">{tasteDescription}</p>
            </div>

            <div className="c-cust-details">
              <div className="c-cust-details-item">
                <span>Vị nền:</span>
                <strong>{baseLabel}</strong>
              </div>
              <div className="c-cust-details-item">
                <span>Mã số mẻ tùy chỉnh:</span>
                <strong>{customCode}</strong>
              </div>
              <div className="c-cust-details-item">
                <span>Chế tác thủ công:</span>
                <strong>Có (làm tay theo đơn)</strong>
              </div>
            </div>

            <div className="c-cust-action-box">
              <button type="button" className={`c-cust-copy-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Đã sao chép yêu cầu đặt bánh!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    1. Sao chép yêu cầu đặt bánh
                  </>
                )}
              </button>
              <div className="c-cust-links">
                <a href="https://instagram.com/charmie.tiramisu" target="_blank" rel="noopener noreferrer" className="c-cust-link">
                  2. Gửi qua Instagram
                </a>
                <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" className="c-cust-link">
                  2. Gửi qua Zalo
                </a>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--mocha)', textAlign: 'center', marginTop: '4px' }}>
                * Bấm sao chép yêu cầu rồi gửi tin nhắn cho Charmie ở nút bên cạnh để đặt hàng!
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

/* ── Occasions ──────────────────────────────────────────────── */
const OCC = [
  { icon:'💝', label:"Valentine's Day" },
  { icon:'🎂', label:'Sinh nhật' },
  { icon:'🌸', label:'Baby Shower' },
  { icon:'🙏', label:'Cảm ơn' },
  { icon:'✨', label:'Tự thưởng bản thân' },
];

const Occasions = () => (
  <section className="c-occ">
    <div className="c-wrap">
      <FadeIn className="c-sechd">
        <h2 className="c-sec-title">Quà cho mọi khoảnh khắc</h2>
      </FadeIn>
      <FadeIn delay={130} className="c-occ-chips">
        {OCC.map((o, i) => (
          <button key={i} className="c-chip" type="button" onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })} aria-label={`Đặt quà cho dịp ${o.label}`}>
            <span aria-hidden="true">{o.icon}</span>
            <span>{o.label}</span>
          </button>
        ))}
      </FadeIn>
    </div>
  </section>
);

/* ── Order CTA ──────────────────────────────────────────────── */
const OrderCTA = () => (
  <section id="order" className="c-cta">
    <div className="c-wrap">
      <FadeIn className="c-cta-inner">
        <span className="c-eyebrow c-eyebrow--lt">◆ Đặt hàng ngay</span>
        <h2 className="c-cta-title">Sẵn sàng<br/>đặt hàng?</h2>
        <p className="c-cta-copy">
          Charmie nhận đặt hàng qua Instagram và Zalo.
          Giao hàng toàn TP.HCM.
        </p>
        <div className="c-cta-btns">
          <a href="https://instagram.com/charmie.tiramisu" target="_blank" rel="noopener noreferrer" className="c-btn c-btn-ivory">
            Instagram @charmie.tiramisu
          </a>
          <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" className="c-btn c-btn-rim">
            Nhắn Zalo
          </a>
        </div>
        <p className="c-cta-note">
          ⏱ 2–3 ngày làm việc · Ahamove hoặc Grab Express
        </p>
      </FadeIn>
    </div>
  </section>
);

/* ── Footer ─────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="c-foot">
    <div className="c-wrap c-foot-inner">
      <span>© 2026 Charmie · Tiramisu Artisanal · Ho Chi Minh City</span>
      <div className="c-foot-links">
        <a href="journal/about.html">Về Charmie</a>
        <a href="journal/privacy.html">Riêng tư</a>
        <a href="journal/affiliate-disclosure.html">Affiliate</a>
        <a href="https://instagram.com/charmie.tiramisu" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" aria-label="Zalo" style={{fontSize:'12px',fontWeight:600,letterSpacing:'0.5px'}}>Zalo</a>
      </div>
    </div>
  </footer>
);

/* ── exports ────────────────────────────────────────────────── */
Object.assign(window, { FadeIn, Nav, Hero, Statement, BrandStory, JournalPreview, Products, Customizer, Occasions, OrderCTA, Footer });
