const { useState, useEffect } = React;

const App = () => {
  const [t, setTweak] = useTweaks(
    /*EDITMODE-BEGIN*/{"palette":"warm","heroLayout":"split","cardStyle":"clean"}/*EDITMODE-END*/
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.pageYOffset > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove("palette-warm", "palette-blush", "palette-forest");
    if (t.palette !== "warm") el.classList.add(`palette-${t.palette}`);
  }, [t.palette]);

  return (
    <>
      <a className="skip-link" href="#main-content">Bỏ qua điều hướng</a>
      <Nav scrolled={scrolled} />
      <main id="main-content">
        <Hero layout={t.heroLayout} />
        <Statement />
        <BrandStory />
        <JournalPreview />
        <Products cs={t.cardStyle} />
        <Occasions />
        <OrderCTA />
      </main>
      <Footer />
      <TweaksPanel>
        <TweakSection label="Màu sắc" />
        <TweakRadio label="Palette" value={t.palette}
          options={["warm", "blush", "forest"]}
          onChange={(value) => setTweak("palette", value)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Hero" value={t.heroLayout}
          options={["split", "centered"]}
          onChange={(value) => setTweak("heroLayout", value)} />
        <TweakRadio label="Cards" value={t.cardStyle}
          options={["clean", "warm"]}
          onChange={(value) => setTweak("cardStyle", value)} />
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
