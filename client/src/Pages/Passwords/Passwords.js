import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Password from "../../Components/Password/Password";
import "./Passwords.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveNewPassword, checkAuthenticated } from "../../axios/instance";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setPasswords } from "../../redux/actions";

function Passwords() {
  const [platform, setPlatform] = useState("");
  const [platEmail, setPlatEmail] = useState("");
  const [platPass, setPlatPass] = useState("");

  const [open, setOpen] = useState(false);

  const history = useHistory();

  const { isAuthenticated, name, email, passwords } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const verifyUser = async () => {
    try {
      const res = await checkAuthenticated();

      if (res.status === 400) {
        dispatch(setAuth(false));
      } else {
        const { passwords } = res.data;
        dispatch(setPasswords(passwords));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewPassword = async () => {
    try {
      const data = {
        platform: platform,
        userPass: platPass,
        platEmail: platEmail,
        userEmail: email,
      };

      const res = await saveNewPassword(data);

      if (res.status === 400) {
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.status === 200) {
        setOpen(false);
        verifyUser();
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setPlatform("");
        setPlatEmail("");
        setPlatPass("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !isAuthenticated && history.replace("/signin");
  }, [isAuthenticated, history]);

  return (
    <div className="passwords">
      <ToastContainer />
      <h1>
        Welcome <span className="name"> {name} </span>{" "}
      </h1>

      <div className="modal">
        <button className="modalButton" onClick={() => setOpen(true)}>
          Add New Password
        </button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <h2>Add a new password</h2>
          <form className="form">
            <div className="form__inputs">
              <label> Platform </label>
              <input
                type="text"
                placeholder="E.g. Facebook"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              />
            </div>

            <div className="form__inputs">
              <label> Email </label>
              <input
                type="email"
                placeholder="E.g. rohitsaini@gmail.com"
                value={platEmail}
                onChange={(e) => setPlatEmail(e.target.value)}
                required
              />
            </div>

            <div className="form__inputs">
              <label> Password </label>
              <input
                type="password"
                placeholder="Password"
                value={platPass}
                onChange={(e) => setPlatPass(e.target.value)}
                required
              />
            </div>

            <button onClick={addNewPassword}> Add </button>
          </form>
        </Modal>
      </div>

      <hr />

      <div className="passwords__list">
        {passwords?.length !== 0 ? (
          passwords?.map((data) => {
            return (
              <Password
                key={data._id}
                id={data._id}
                name={data.platform}
                password={data.password}
                email={data.platEmail}
                iv={data.iv}
              />
            );
          })
        ) : (
          <div className="nopass">
            <p> You have not added any passwords yet. </p>
            <button className="modalButton" onClick={() => setOpen(true)}>
              {" "}
              Try Adding a password now{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Passwords;
