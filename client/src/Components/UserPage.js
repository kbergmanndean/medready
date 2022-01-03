import React from 'react'

function UserPage(){

    const navigate=useNavigate();

    function handleLogout(){
        async function logout(){
            const res=await fetch("https://medready.herokuapp.com/logout",{
                method:"DELETE"})
                if (res.ok){
                    setUser(null);
                    localStorage.clear();
                    
                };
        };logout();
        navigate('login');
    };

    const user_id=localStorage.getItem("user_id")
    const username=localStorage.getItem("username")

    function handleDelete(){
        async function destroy(){
            await fetch(`https://medready.herokuapp.com/users/${user_id}`,{
                method:"DELETE"
            })
                
        };destroy();
        handleLogout();
    };

    return(
        <div>
            <button className="btn btn-outline-dark delete-account" onClick={handleDelete}>Delete Account</button>
        </div>
    )
}

export default UserPage