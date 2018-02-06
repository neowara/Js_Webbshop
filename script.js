$(document).ready(function(){ 

    //Variables

    var user = "test"
    var password = "password"
    var categoryMain = "";
    var productPage = "";
    var shoppingCart = [];
    var userAdmin = "admin"
    var passwordAdmin = "admin"

    //Variables

    // Json file fetching //

    fetch("json/huvudkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        categoryMain = data;

        appendCategoryMain();
    });

    fetch("json/underkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        categorySecond = data;
        
        appendCategorySecond();
    });

    fetch("json/produkter.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        produkter = data;

    });

    // Json file fetching //

    
   // Buttons //
    
    $("#login").click(function(){
        
        if ( $(".username").val() == user && $(".pass").val() == password ) {
            userLoggedIn();
            location.reload(true);  

        } else {
            alert("Wrong password, try again!");
        }
    });

    $("#logout").click(function(){
        sessionStorage.clear()
        location.reload();      
        pageStandardView();
    });

 // Buttons //

// Functions //

    function pageStandardView() {
        $("#login").show();     
        $("#logout").hide(); 
        $(".namn").hide(); 
        $(".username").show();
        $(".pass").show();
        
    };

    function userLoggedIn() {
        $("#login").hide();     
        $("#logout").show(); 
        $(".username").hide();
        $(".pass").hide();

        sessionStorage.setItem("userId", $(".username").val() );
        $(".namn").show(); 
        $(".namn").append(sessionStorage.getItem("userId"));                 
    };

    function appendCategoryMain() {
        for(i = 0; i < categoryMain.length; i++) {

            var categoryMainId = (categoryMain[i].id);
            var categoryMainName = (categoryMain[i].categoryname);
            var printCategoryMain = "";

            var printCategoryMain = '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" onclick= "showCatMainProducts(' + [i] + ')">'+ categoryMain[i].categoryname +'<span class="caret"></span></a><ul class="dropdown-menu" id="mc'+ categoryMainId +'"></ul></li>';
            $('#categoryMain').append(printCategoryMain);

        };
    };

    function appendCategorySecond() {
        for(i = 0; i < categorySecond.length; i++) {

            var categorySecondId = (categorySecond[i].id);
            var categorySecondType = (categorySecond[i].type);
            var categorySecondMain = (categorySecond[i].huvudkategori);

            var subCategoryMain = '<li id="uc'+ categorySecondId +'" onclick="showSecCatProducts('+ categorySecondId +')"><a href="#">'+ categorySecondType +'</a></li>';

            if (categorySecondMain == 1) {
                $('#mc1').append(subCategoryMain);

            } else if (categorySecondMain == 2) {
                $('#mc2').append(subCategoryMain);
            
            } else if (categorySecondMain == 3) {
                $('#mc3').append(subCategoryMain);

            } else {
                $('#mc4').append(subCategoryMain);
            }

        };
    };

    showCatMainProducts = function(val){

        $(".allProducts").empty();
        $(".jumbotron").hide(); 

        var value = val + 1;
                
        for(i = 0; i < produkter.length; i++) {

            var productId = (produkter[i].id);
            var productName = (produkter[i].prodName);
            var productDesc = (produkter[i].prodDesc);
            var productImage = "pictures/" + (produkter[i].image);
            var productPrice = (produkter[i].prodPrice);
            var productMainCat = (produkter[i].categoryMain);
            var productSecCat = (produkter[i].categorySecond);
            var productPage = "";

            var productPage = '<div class="col-lg-4"><div class="card" onclick="showOneProduct('+ productId +')"><img class="card-img-top" src="' + productImage + '"><div class="card-body"><h4 class="card-title">' + productName + '</h4><div class="card-footer "><p>Price: ' + productPrice + '</p></div></div></div></div>';

            if ( productMainCat == value) {
        
            $('.allProducts').append(productPage);
            }
            
        };
    };


    showSecCatProducts = function(val){

        $(".allProducts").empty();
        $(".jumbotron").hide(); 

        var value = val;
        
        for(i = 0; i < produkter.length; i++) {

            var productId = (produkter[i].id);
            var productName = (produkter[i].prodName);
            var productDesc = (produkter[i].prodDesc);
            var productImage = "pictures/" + (produkter[i].image);
            var productPrice = (produkter[i].prodPrice);
            var productMainCat = (produkter[i].categoryMain);
            var productSecCat = (produkter[i].categorySecond);
            var productPage = "";

            var productPage = '<div class="col-lg-4"><div class="card" onclick="showOneProduct('+ productId +')"><img class="card-img-top" src="' + productImage + '"><div class="card-body"><h4 class="card-title">' + productName + '</h4><div class="card-footer "><p>Price: ' + productPrice + '</p></div></div></div></div>';

            if ( productSecCat == value) {
            
            $('.allProducts').append(productPage);
            }
            
        };
    };


    showOneProduct = function(val){

        $(".allProducts").empty();
        $(".jumbotron").hide(); 

        var value = val;
        
        for(i = 0; i < produkter.length; i++) {

            var productId = (produkter[i].id);
            var productName = (produkter[i].prodName);
            var productDesc = (produkter[i].prodDesc);
            var productImage = "pictures/" + (produkter[i].image);
            var productPrice = (produkter[i].prodPrice);
            var productMainCat = (produkter[i].categoryMain);
            var productSecCat = (produkter[i].categorySecond);
            var productPage = "";

            var productPage = '<div class="col-lg-3"><div class="card"><img class="card-img-top" src="' + productImage + '"><div class="card-body"><h4 class="card-title">' + productName + '</h4><p class="card-text">' + productDesc + '</p><div class="card-footer "><p>Pris: ' + productPrice + '</p><a href="#" class="btn btn-success" onclick="addToCart('+ productId +')">Buy now</a></div></div></div></div>';

            if ( productId == value) {
            
            $('.allProducts').append(productPage);
            }
            
        };
    };

    //Shopping Cart//

    addToCart = function(val){
        var shoppingCart = JSON.parse(sessionStorage.shoppingCart);
        shoppingCart.push(produkter[val-1]);

        alert("Added to cart");

        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str; 
    };


    delCartItem = function(i){
        var shoppingCart = JSON.parse(sessionStorage.shoppingCart);
        shoppingCart.splice(i, 1);

        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str;
        
        shopCart();

    }

        
   //Session Storage //

    if (sessionStorage.shoppingCart == null){
        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str; 
    }
    if (sessionStorage.userId == null) {
    
        pageStandardView();
    } else {
        userLoggedIn();
    }

    //Session Storage //


    shopCart = function() {
        
        $(".container").html("<h3>These are your products:</h3>");

        var shoppingCart = JSON.parse(sessionStorage.shoppingCart);

        var cartProdName = "<ul class='cartList'>"
        var cartProdPrice = "<ul class='cartList'>"
        var cartRemove = "<ul class='cartList'>"

        for(var i = 0; i < shoppingCart.length; i++){
            cartProdName += "<li>" + shoppingCart[i].prodName + "</li>";
            cartProdPrice += "<li>" + shoppingCart[i].prodPrice + " kr</li>";
            cartRemove += "<li><a href='#' onClick='delCartItem(" + i + ")'>Delete</a></li>";
        }

        cartProdName += "<li>Mail fees</li></ul>"
        cartProdPrice += "<li>55 kr</li></ul>"
        cartRemove += "</ul>"

        $('.container').append("<div class='allCart'><div class='cart'>" + cartProdName + "</div><div class='cart'>" +  cartProdPrice + "</div><div class='cart'>" +   cartRemove + "</div></div>");


        var totalPrice = 55;
        for(var i = 0; i < shoppingCart.length; i++) {
            totalPrice += shoppingCart[i].prodPrice;
        }
        $(".container").append("<h3>Totalpris: " + totalPrice + " kr</h3>");

        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str; 
        
        $(".container").append("<button onclick='finishOrder()'>Finish purchase </button>");
    };

    finishOrder = function() {

        if (sessionStorage.userId == null) {
            alert("Please log in first")
        } else {
            $(".container").html("Thanks for buying with us!");
            sessionStorage.clear();  
        }
}

// Shopping Cart //

// Admin Page //

    if (sessionStorage.userIdAdmin == null) {
        $('.admin').html("Please log in");
        $(".adminMenu").hide(); 
        $("#loginAdmin").show(); 
        $("#logoutAdmin").hide(); 
    } else {
        showAdminSite();
    }

    function showAdminSite() {
        $('.admin').html("Welcome back admin!");
        $(".adminMenu").show(); 
        $("#loginAdmin").hide(); 
        $(".usernameAdmin").hide(); 
        $(".passAdmin").hide(); 
        $("#logoutAdmin").show(); 
        $(".adminMenu").html(" "); 
        $('.adminMenu').append('<div class="nav navbar-nav"><ul><li class"adminMenu"><a href="admin.html">Start</a></li><li onclick="listCustomers()" class"adminMenu"><a href="#">Customer List</a></li><li class"adminMenu"><a href="#">Orders List</a></li><li class"adminMenu"><a href="#">E-mail List</a></li></ul></div>');


    };

    listCustomers = function() {
        $('.adminList').show(); 
        $('.adminList').html(" ");

            //Fetchar JSON-filen kunder
            fetch("json/kunder.json")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                customerList = data;

                $('.adminList').append("Our customers: ");


                for(i = 0; i < customerList.length; i++) {

                    var customerId = (customerList[i].id);
                    var customerEmail = (customerList[i].email);
                    var customerName = (customerList[i].name);
                    var writeCustomerList = "";
                    var writeCustomerList = '<ul><li>' + customerId + '</li><li>' + customerEmail + '</li><li>' + customerName + '</li></ul>';
                    
                    $('.adminList').append(writeCustomerList);
                };
            });
    };

    $("#loginAdmin").click(function(){


        if ( $(".usernameAdmin").val() == userAdmin && $(".passAdmin").val() == passwordAdmin ) {
            sessionStorage.setItem("userIdAdmin", $(".usernameAdmin").val() );
            showAdminSite();

        } else {
            alert("Wrong password");
        }

    });

    $("#logoutAdmin").click(function(){
        $('.admin').html("You are logged out!");
        $(".adminMenu").hide(); 
        $("#logoutAdmin").hide(); 
        $("#loginAdmin").show(); 
        $('.adminList').hide(); 
        $(".usernameAdmin").show(); 
        $(".passAdmin").show(); 
        sessionStorage.clear();           
    });

    


        // Admin Page //

});