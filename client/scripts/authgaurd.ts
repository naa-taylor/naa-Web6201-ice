(function (){

    let protected_routes: string[] = ["contactlist"];

    if(protected_routes.indexOf(router.ActiveLink)> -1){
        if(!sessionStorage.getItem("user")){
            location.href = "/login"
        }
    }
})()

