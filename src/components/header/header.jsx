import React from 'react';
import { useState } from 'react';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Header = () => {
  const location = useLocation();
  const [visableID, setVisableID] = useState()
  const setVis = () => {
    console.log("hi")
    setVisableID(!visableID);
  }
    return (
      <section className="header">
        <section className="wrap">
          <span className="logo">
            <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.22979 2.16931H6.90252C5.59342 2.16931 4.57192 2.57496 3.83804 3.38624C3.12398 4.17989 2.76696 5.59965 2.76696 7.6455C2.76696 8.29806 2.83638 8.75661 2.97522 9.02116C3.11407 9.26808 3.18349 9.40917 3.18349 9.44444C2.11241 9.44444 1.3091 9.25044 0.773558 8.86243C0.257853 8.45679 0 7.79541 0 6.87831C0 5.6261 0.347109 4.48854 1.04133 3.46561C1.73555 2.42504 2.83638 1.5873 4.34382 0.952381C5.87111 0.31746 7.805 0 10.1455 0C10.8596 0 11.8414 0.0793651 13.091 0.238095C13.21 0.255733 13.6761 0.308643 14.4893 0.396827C15.3224 0.48501 16.1654 0.529102 17.0183 0.529102C18.5059 0.529102 19.9439 0.361553 21.3323 0.0264563C21.0943 1.19048 20.6877 2.16931 20.1125 2.96296C19.5373 3.73898 18.7141 4.12698 17.6431 4.12698C16.929 4.12698 16.2943 4.06526 15.7389 3.9418C15.1836 3.80071 14.5191 3.59788 13.7455 3.33333C12.9521 3.06878 12.1687 2.83951 11.3951 2.6455L10.1158 7.93651H13.8645L13.3885 9.89418H9.63972L7.22979 19.8413H2.94547L7.22979 2.16931ZM16.334 20C15.3819 20 14.6083 19.7354 14.0133 19.2063C13.4381 18.6772 13.1505 17.8836 13.1505 16.8254C13.1505 16.3845 13.2298 15.8113 13.3885 15.1058L15.4117 6.61376H19.696L17.5538 15.6085C17.4745 15.873 17.4348 16.1552 17.4348 16.455C17.4348 16.8078 17.5241 17.0635 17.7026 17.2222C17.9009 17.3633 18.2183 17.4339 18.6546 17.4339C19.2299 17.4339 19.7654 17.2222 20.2613 16.7989C20.7571 16.358 21.1142 15.7937 21.3323 15.1058H22.5819C21.848 17.0106 20.9059 18.3069 19.7555 18.9947C18.6051 19.6649 17.4646 20 16.334 20Z" fill="black"/>
            <path d="M32.0606 20C30.8507 20 29.9581 19.7178 29.3829 19.1534C28.8275 18.5714 28.5498 17.8571 28.5498 17.0106C28.5498 16.6402 28.5994 16.2257 28.6986 15.7672C28.7977 15.291 28.8969 14.8325 28.9961 14.3915C29.1151 13.9506 29.1944 13.6684 29.2341 13.545C29.3928 12.9277 29.5416 12.3192 29.6804 11.7196C29.8192 11.1199 29.8887 10.6349 29.8887 10.2646C29.8887 9.36508 29.5316 8.91534 28.8176 8.91534C28.3019 8.91534 27.8457 9.14462 27.449 9.60317C27.0523 10.0441 26.7349 10.6261 26.4969 11.3492L24.4738 19.8413H20.1894L23.3432 6.61376H27.6275L27.3002 7.98942C28.292 7.00176 29.4523 6.50794 30.7812 6.50794C31.7928 6.50794 32.5961 6.75485 33.1912 7.24868C33.7862 7.74251 34.0837 8.49206 34.0837 9.49735C34.0837 10.0088 34.0143 10.582 33.8755 11.2169C33.7366 11.8342 33.5383 12.5926 33.2804 13.4921C33.1217 14.0388 32.973 14.5767 32.8341 15.1058C32.7151 15.6173 32.6556 16.0229 32.6556 16.3228C32.6556 16.6755 32.7449 16.9489 32.9234 17.1429C33.1019 17.3369 33.4093 17.4339 33.8457 17.4339C34.4408 17.4339 34.9168 17.2487 35.2738 16.8783C35.6308 16.4903 35.9879 15.8995 36.3449 15.1058H37.5945C36.8606 17.0459 36.0077 18.351 35.0358 19.0212C34.0837 19.6737 33.092 20 32.0606 20Z" fill="black"/>
            <path d="M39.9117 20C38.7811 20 37.8389 19.6561 37.0852 18.9683C36.3315 18.2804 35.9546 17.2046 35.9546 15.7407C35.9546 14.4356 36.2422 13.0688 36.8174 11.6402C37.4125 10.194 38.2852 8.97707 39.4356 7.98942C40.6059 6.98413 41.9943 6.48148 43.6009 6.48148C44.4142 6.48148 45.0191 6.60494 45.4158 6.85185C45.8125 7.09877 46.0109 7.42504 46.0109 7.83069V8.01587L46.3382 6.61376H50.6225L48.4803 15.6085C48.401 15.873 48.3613 16.1552 48.3613 16.455C48.3613 17.2134 48.7679 17.5926 49.5811 17.5926C50.1365 17.5926 50.6126 17.3633 51.0093 16.9048C51.4258 16.4462 51.7531 15.8466 51.9911 15.1058H53.2407C52.5068 17.0106 51.5944 18.3069 50.5035 18.9947C49.4324 19.6649 48.3514 20 47.2605 20C46.4274 20 45.753 19.7972 45.2373 19.3915C44.7415 18.9683 44.4439 18.3598 44.3448 17.5661C43.7695 18.2892 43.1249 18.8801 42.4109 19.3386C41.7166 19.7795 40.8836 20 39.9117 20ZM41.8456 17.4339C42.3414 17.4339 42.8274 17.231 43.3034 16.8254C43.7993 16.4021 44.1365 15.8289 44.315 15.1058L45.7431 9.12698C45.7431 8.89771 45.6439 8.67725 45.4456 8.46561C45.2472 8.23633 44.9398 8.12169 44.5233 8.12169C43.7299 8.12169 43.0158 8.53615 42.3811 9.36508C41.7464 10.1764 41.2505 11.164 40.8935 12.328C40.5365 13.4744 40.358 14.4885 40.358 15.3704C40.358 16.2522 40.4968 16.8166 40.7745 17.0635C41.072 17.3104 41.429 17.4339 41.8456 17.4339Z" fill="black"/>
            <path d="M54.888 20C53.9359 20 53.1623 19.7354 52.5673 19.2063C51.9921 18.6596 51.7045 17.8483 51.7045 16.7725C51.7045 16.3316 51.7838 15.7584 51.9425 15.0529L55.126 1.79894L59.5293 1.26984L56.1078 15.5556C56.0285 15.8201 55.9888 16.0758 55.9888 16.3228C55.9888 17.0282 56.3954 17.381 57.2086 17.381C57.5657 17.381 57.883 17.328 58.1607 17.2222C58.0814 18.1041 57.7243 18.7919 57.0896 19.2857C56.4748 19.7619 55.7409 20 54.888 20Z" fill="black"/>
            <path d="M73.5077 2.32804H73.1507C71.3854 2.32804 70.0069 2.72487 69.0152 3.51852C68.0433 4.29453 67.5573 5.67901 67.5573 7.67196C67.5573 8.32452 67.6267 8.78307 67.7656 9.04762C67.9044 9.29453 67.9738 9.43563 67.9738 9.4709C66.9027 9.4709 66.0994 9.2769 65.5639 8.88889C65.0482 8.48325 64.7903 7.82187 64.7903 6.90476C64.7903 5.65256 65.1375 4.51499 65.8317 3.49206C66.5259 2.4515 67.6267 1.61376 69.1342 0.978836C70.6614 0.343916 72.5953 0.0264563 74.9359 0.0264563C76.2449 0.0264563 77.6532 0.132276 79.1607 0.343916C80.4301 0.53792 81.5607 0.634922 82.5524 0.634922C83.8219 0.634922 84.9723 0.449736 86.0037 0.0793656C85.964 1.22575 85.6367 2.07231 85.0219 2.61905C84.407 3.16579 83.4946 3.43915 82.2847 3.43915C81.6499 3.43915 81.0152 3.39506 80.3805 3.30688C79.7458 3.2187 78.8433 3.06878 77.6731 2.85714L73.5672 19.8413H69.2829L73.5077 2.32804Z" fill="black"/>
            <path d="M82.5062 20C81.3756 20 80.4334 19.6561 79.6797 18.9683C78.926 18.2804 78.5491 17.2046 78.5491 15.7407C78.5491 14.4356 78.8367 13.0688 79.4119 11.6402C80.007 10.194 80.8797 8.97707 82.0301 7.98942C83.2004 6.98413 84.5888 6.48148 86.1954 6.48148C87.0087 6.48148 87.6136 6.60494 88.0103 6.85185C88.407 7.09877 88.6054 7.42504 88.6054 7.83069V8.01587L88.9326 6.61376H93.217L91.0748 15.6085C90.9955 15.873 90.9558 16.1552 90.9558 16.455C90.9558 17.2134 91.3624 17.5926 92.1756 17.5926C92.731 17.5926 93.207 17.3633 93.6037 16.9048C94.0203 16.4462 94.3475 15.8466 94.5856 15.1058H95.8352C95.1013 17.0106 94.1889 18.3069 93.098 18.9947C92.0269 19.6649 90.9459 20 89.855 20C89.0219 20 88.3475 19.7972 87.8318 19.3915C87.3359 18.9683 87.0384 18.3598 86.9392 17.5661C86.364 18.2892 85.7194 18.8801 85.0053 19.3386C84.3111 19.7795 83.4781 20 82.5062 20ZM84.4401 17.4339C84.9359 17.4339 85.4219 17.231 85.8979 16.8254C86.3938 16.4021 86.731 15.8289 86.9095 15.1058L88.3376 9.12698C88.3376 8.89771 88.2384 8.67725 88.0401 8.46561C87.8417 8.23633 87.5343 8.12169 87.1178 8.12169C86.3244 8.12169 85.6103 8.53615 84.9756 9.36508C84.3409 10.1764 83.845 11.164 83.488 12.328C83.131 13.4744 82.9524 14.4885 82.9524 15.3704C82.9524 16.2522 83.0913 16.8166 83.369 17.0635C83.6665 17.3104 84.0235 17.4339 84.4401 17.4339Z" fill="black"/>
            <path d="M97.9882 20C97.0362 20 96.2329 19.8413 95.5783 19.5238C94.9238 19.1887 94.4378 18.7654 94.1205 18.254C93.8031 17.7249 93.6444 17.1781 93.6444 16.6138C93.6444 16.0317 93.8031 15.5291 94.1205 15.1058C94.418 14.6649 94.7849 14.3474 95.2213 14.1534C95.9949 12.9189 96.6692 11.6755 97.2444 10.4233C97.8196 9.15344 98.3651 7.7866 98.8808 6.32275L103.284 5.79365C103.383 8.05115 103.552 10.4938 103.79 13.1217C103.889 14.1799 103.939 14.9471 103.939 15.4233C103.939 15.8289 103.899 16.164 103.82 16.4286C104.752 15.9524 105.466 15.5115 105.962 15.1058H107.211C105.942 16.4109 104.425 17.5132 102.659 18.4127C102.084 18.9594 101.37 19.3651 100.517 19.6296C99.6841 19.8765 98.8411 20 97.9882 20ZM97.0362 17.9101C97.7701 17.9101 98.3849 17.716 98.8808 17.328C99.3767 16.94 99.6246 16.3139 99.6246 15.4497C99.6246 14.9206 99.5651 14.1799 99.4461 13.2275C99.2477 11.2169 99.1188 9.86773 99.0593 9.17989C98.5833 10.5732 97.78 12.2399 96.6494 14.1799C97.1056 14.3915 97.3337 14.7002 97.3337 15.1058C97.3337 15.4409 97.2048 15.7407 96.9469 16.0053C96.7089 16.2698 96.4015 16.4021 96.0246 16.4021C95.6081 16.4021 95.3403 16.2875 95.2213 16.0582C95.2213 16.6931 95.3601 17.1605 95.6378 17.4603C95.9353 17.7601 96.4015 17.9101 97.0362 17.9101Z" fill="black"/>
            <path d="M117.144 20C115.914 20 114.982 19.7443 114.347 19.2328C113.712 18.7037 113.395 17.9541 113.395 16.9841C113.395 16.5608 113.455 16.1023 113.574 15.6085L113.812 14.5767C113.891 14.2769 113.931 13.9506 113.931 13.5979C113.931 12.7513 113.574 12.328 112.859 12.328C112.542 12.328 112.205 12.4074 111.848 12.5661C111.511 12.7249 111.114 12.9718 110.658 13.3069L109.111 19.8413H104.826L109.14 1.85185L113.544 1.32275L111.312 10.6349L117.055 6.61376H120L114.05 10.291C114.347 10.2205 114.674 10.1852 115.031 10.1852C116.102 10.1852 116.916 10.4762 117.471 11.0582C118.026 11.6402 118.304 12.381 118.304 13.2804C118.304 13.6508 118.264 13.9859 118.185 14.2857L117.858 15.6085C117.759 15.9259 117.709 16.2081 117.709 16.455C117.709 17.1076 118.096 17.4339 118.869 17.4339C119.306 17.4339 119.583 17.4074 119.702 17.3545C119.821 17.3016 119.891 17.2751 119.911 17.2751C119.871 17.8571 119.683 18.351 119.345 18.7566C119.028 19.1623 118.651 19.4709 118.215 19.6825C117.798 19.8942 117.441 20 117.144 20Z" fill="black"/>
          </svg>
          </span>
          <div className="group-lnk">
            <Link to={AppRoute.MAIN} className={`lnk ${location.pathname != AppRoute.USERS && 'lnk-active'} `}> Задачи</Link>
            <Link to={AppRoute.USERS} className={`lnk ${location.pathname === AppRoute.USERS && 'lnk-active'}`}>Пользователи</Link>
          </div>
          <div className="profile">

              <span className="username">Baby grout</span>
              <div className="userfoto ">
                  <img className={`profile_foto`} onClick={setVis} src="https://upload.wikimedia.org/wikipedia/ru/d/d9/Vin_Diesel_as_Groot.jpeg?20210722164205" alt="" width={42} height={42} />
                  <div className={`dropdown-content ${(visableID == true) && "visable"}`} >
                    <Link to="/">Посмотреть профиль</Link>
                    <Link to="/" style={{color : "red"}}>Удалить</Link>
                  </div>
              </div>


          </div>

        </section>
      </section>
    )
}

export default Header;
