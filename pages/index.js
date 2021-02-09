import { getStudentID } from "../lib/api";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import PopupOptions from '../component/popup_options';
import Swal from 'sweetalert2';
import Loading from '../component/Loading';
import Image from 'next/image';


export default function IndexPage({ students }) {
  const [loading, setLoading] = useState(false);
  const [currentID, setCurrentID] = useState("");
  // Cookies
  const cookies = new Cookies();

  function handleSubmit(student_ID) {
    var check = false;
    // trigger loading screen
    setLoading(true);
    students.map((student) => {
      if (student.studentID === student_ID) {
        cookies.set('currentID', student_ID, { maxAge: 10000 });
        check = true;
        var titleDescription = "Signed In As " + student_ID;
        var textDescription = "What do you want to do next?";
        // end loading screen and show options
        setLoading(false);
        PopupOptions(titleDescription, textDescription);
      }
    })
    if (!check) {
      // end loading screen and show warning
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Student ID not found',
        text: 'Please try again.',
        showCloseButton: true
      })
    }
  }

  // Check in the cookies if currentID existed or not
  useEffect(() => {
    const prevID = cookies.get('prevID');

    if (cookies.get('currentID')) {
      var titleDescription = "Signed In As " + cookies.get('currentID');
      var textDescription = "What do you want to do next?";
      setCurrentID(cookies.get('currentID'));
      PopupOptions(titleDescription, textDescription);
    } else {
      if (prevID) {
        Swal.fire({
          title: "Existing Cart!",
          text: "The previous user forgot to commit the cart. What would you like to do? ",
          icon: "warning",
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonText: "Start your new cart",
          showDenyButton: true,
          denyButtonText: "Check out old cart",
        }).then((result) => {
          if (result.isConfirmed) {
            cookies.remove('prevID');
            cookies.remove('order_details');
          } else if (result.isDenied) {
            window.location = "/checkout";
            Swal.fire({
              icon: 'info',
              title: 'Redirecting to checkout...',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
    }
  }, [])

  return (
    <main>
      {loading ? (
        <>
          <Loading load={loading} />
        </>
      ) : <div className="login-container">
          <input className="c-checkbox" type="checkbox" id="start" />
          <input className="c-checkbox" type="checkbox" id="finish" />
          <div className="c-formContainer">
            <form className="c-form" action="" value={currentID}
              onChange={(e) => setCurrentID(e.target.value)}>
              <div className="c-form__group">
                <label className="c-form__label" htmlFor="username">
                  <input
                    type="text"
                    id="username"
                    className="c-form__input"
                    placeholder=" "
                    pattern="^n.*"
                    required />

                  <label className="c-form__next" htmlFor="finish" role="button" onClick={() => handleSubmit(currentID)}>
                    <span className="c-form__nextIcon"></span>
                  </label>

                  <span className="c-form__groupLabel">Enter your student ID.</span>
                  <b className="c-form__border"></b>
                </label>
              </div>

              <label className="c-form__toggle" htmlFor="start">Login<span className="c-form__toggleIcon"></span></label>
            </form>
          </div>
          <img className="login-img" src="" width="300" height="100" />
          <img className="logo-img" src="/img/logo_white.png" alt="qutmotorsport_logo" />
        </div>}
    </main>
  );
}

export async function getStaticProps(context) {
  const students = await getStudentID();
  return {
    props: {
      students,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 100, // In seconds
  };
}