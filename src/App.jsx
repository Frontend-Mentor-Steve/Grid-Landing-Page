import './App.css'
import Menu from './assets/icons/icon-menu.svg'
import Icon from './assets/favicon-32x32.png'
import Sparkle from './assets/icon-sparkle.svg'
import Up from './assets/icon-trending-up.svg'
import Plus from './assets/icon-plus.svg'
import Arrow from './assets/icon-arrow-right.svg'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const [height, setheight] = useState(0)
  const rightSectionRef = useRef()
  const leftSectionRef = useRef()
  useEffect(() => {
    const element = rightSectionRef.current;
    const mobile = leftSectionRef.current;

    if (!element && !mobile) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setWidth(width / 2)
    });

    const observing = new ResizeObserver((entries) => {
      const height = entries[0].borderBoxSize[0].blockSize;
      const width = entries[0].borderBoxSize[0].inlineSize;
      if (width < 16 * 30) {
        setWidth(width)
      }
      console.log(height)
      setheight(height)
    });

    observer.observe(element);
    observing.observe(mobile);

    return () => {
      observer.disconnect();
      observing.disconnect();
    };
  }, [])

  const handleSideBar = (e) => {
    console.log("Clicked")
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header>
          <div className="company-name">
            <img src={Icon} />
            <p>Bridge Collective</p>
          </div>
          <div className="drop-down">
            <img src={Menu} onClick={(e) => handleSideBar(e)} />
          </div>
      </header>
      <div className="page-content">
        <main>
          <section className="left-section" ref={leftSectionRef}>
            <div className="wrapper">
              <h1>A classroom for every child.</h1>
              <p>
                We fund the schools, train the teachers,
                and measure what works — so every child we reach today
                becomes a graduate tomorrow.
              </p>
            </div>
          </section>

          <section className="right-section" ref={rightSectionRef}>
            <section className="mini-components">
              <div className="mini-top">
                <img src={Sparkle} />
                <h2>2.4M</h2>
              </div>
              <div className="mini-bottom">
                <p>
                  <span>Students reached</span>
                  <br />
                  Across 31 countries since 2011.
                </p>
              </div>
            </section>
            <section className="mini-components">
              <div className="mini-top">
                <img src={Plus} />
                <h2>1,284</h2>
              </div>
              <div className="mini-bottom">
                <p>
                  <span>Schools partnered</span>
                  <br />
                  In 14 countries, from Kenya to Guatemala.
                </p>
              </div>
            </section>
            <section className="mini-components">
              <div className="mini-top">
                <img src={Arrow} />
                <h2>38K</h2>
              </div>
              <div className="mini-bottom">
                <p>
                  <span>Teachers trained</span>
                  <br />
                  Equipped with modern tools and methodology.
                </p>
              </div>
            </section>
            <section className="mini-components">
              <div className="mini-top">
                <img src={Up} />
                <h2>3.1×</h2>
              </div>
              <div className="mini-bottom">
                <p>
                  <span>Graduation lift</span>
                  <br />
                  Partner schools outperform national averages 3x.
                </p>
              </div>
            </section>
          </section>
        </main>
        <footer>
          <div className="copyright">
            <p>© 2026 Bridge Collective</p>
          </div>
          <div className="registered">
            <p>Registered charity 12345678</p>
          </div>
        </footer>
      </div>

      {isOpen && (
        <div className="backdrop" style={{ "--sidebar-width": `${width}px` }}>

        </div>
        )}



      <div className={`sidebar-${isOpen ? 'open' : 'closed'}`} style={{ "--sidebar-width": `${width}px`, "--sidebar-height": `${height}px`}}>
        <ul>
          <li>About</li>
          <li>Our Work</li>
          <li>Partners</li>
          <li>Annual Report</li>
          <li>Donate</li>
        </ul>
      </div>


    </>
  )
}

export default App
