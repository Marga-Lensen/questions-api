// import "./Footer.css";
import logo from "/ML-logo.png"; // Adjust path as needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="ML Logo" className="footer-logo" />
        {/* <span className="brand-name">ML DevLab</span> */}
      </div>
      <p className="copyright">&copy; {new Date().getFullYear()} ML DevLab. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
