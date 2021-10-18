import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer_container">
      <div id="footer_content_container">
        <div>Site created by Dan Purcell</div>
        <div id="footer_logo_container">
          <a
            href="https://github.com/flow-state-15/skyhop/"
            target="_blank"
            rel="noreferrer"
          >
            <div>Github</div>
          </a>
          <a
            href="https://www.linkedin.com/in/dan-purcell-a60448221/"
            target="_blank"
            rel="noreferrer"
          >
            <div>LinkedIn</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
