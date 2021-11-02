import { useState } from "react";

export const BasicLogin = function ({submitFn}) {

  const [userPass, setUserPass] = useState("")
  const [userName, setUserName] = useState("")
  const [border, setBorder] = useState("solid 1px rgb(179, 179, 179)")
  const [border2, setBorder2] = useState("solid 1px rgb(179, 179, 179)")

    return (
        <div className="login-wrapper" style={{paddingTop: "5rem", paddingLeft: "2rem"}}>
            <h1>Please Sign In</h1>
        <form className="login">
      <div>
      <div style={{paddingTop: "1rem"}}>
       <input style={{width: "25%",outline: border, padding: "1rem", borderRadius: "10px"}}
          value={userName}
          autoComplete="off"
          type="text"
          placeholder="User Id"
          onChange={(e) => setUserName(e.target.value)}
          onFocus={() => setBorder("solid 1px rgb(0,113,227)")}
          onBlur={() => setBorder("solid 1px rgb(179, 179, 179)")}
        />
       </div>
        
        <div style={{paddingTop: "1rem"}}>
        <input style={{width: "25%" ,outline: border2 , padding: "1rem", borderRadius: "10px"}}
          type="password"
          value={userPass}
          placeholder="Password"
          maxLength="7"
          onFocus={() => setBorder2("solid 1px rgb(0,113,227)")}
          onBlur={() => setBorder2("solid 1px rgb(179, 179, 179)")}
          
          onChange={(e) => setUserPass(e.target.value)}
        />

        </div>
        </div>
        <div style={{paddingTop: "2rem", color: "blue"}}>
        <button style={{color: "white",backgroundColor: "rgb(0,113,227)",padding: "1rem", borderRadius: "10px", width: "25%"}} onClick={() => {
          submitFn(userPass === "abc123", userName === "admin")

        }}>Sign In</button>
        </div>
      </form>
      
      </div>
    )
}


export default BasicLogin;