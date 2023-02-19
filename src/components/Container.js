import Weather from "./Weather";

function Container() {
  return (
    <main>
      <div className='container'>
        <Weather />
      </div>
      <footer>
        <div id="copyright">
          <span> &copy; </span>
          <b>Krishana Kumar</b>
        </div>
      </footer>
    </main>
  );
}

export default Container;