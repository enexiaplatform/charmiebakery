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
Object.assign(window, { FadeIn, Nav, Hero, Statement, BrandStory, JournalPreview, Products, Occasions, OrderCTA, Footer });
