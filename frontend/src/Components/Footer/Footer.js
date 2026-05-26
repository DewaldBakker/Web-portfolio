const Footer = () => (
  <footer className="footer" style={{backgroundColor:'black'}}>
    <div className="footer-copy">© 2026 · Built with HTML, CSS &amp; React</div>
    <div className="footer-links">
      {["Back to top ↑"].map((link) => (
        <a key={link} href="#">{link}</a>
      ))}
    </div>
  </footer>
);
export default Footer;