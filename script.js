  
  let apiKey = `https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`;

  async function getMenu(){
    try{
          let response = await fetch(apiKey);
          let data = await response.json();
          console.log(data);
          appendOnUI(data);
    }
    catch(error){
            console.log("something is worng "+ error);
    }
  }
  

  function appendOnUI(data){
    // let menuItem = document.getElementById("menu-item");
    let OrderList = document.createElement("ol");
    OrderList.className = "menu-list";
    let menuItem = document.getElementById("menu-item");
    console.log(menuItem);
          for(let i=0; i < data.length; i++)
          {
                let ListItem = document.createElement("li");
                ListItem.className= "list-item"
                let img = document.createElement("img");
                img.src= data[i].imgSrc;
                let Para1 = document.createElement("p");
                Para1.className = "item-name";
                Para1.innerText = data[i].name;
                let Para2 = document.createElement("p");
                Para2.className="item-price";
                Para2.innerText = "$ "+ data[i].price;
                ListItem.append(img);
                ListItem.append(Para1);
                ListItem.append(Para2);
                OrderList.append(ListItem);
                menuItem.append(OrderList);
          }
  };

  function takeOrder(){
    return new Promise(resolve =>{
        setTimeout(()=>{
            // add randomly burger .
            const burgers = ["Burger A", "Burger B", "Burger C"];
            const order = {
                burgers: burgers
            };
            resolve(order);
        }, 2500);
    });
  }

function orderPrep(){
    return new Promise(resolve =>{
        setTimeout(()=>{
            const orderStatus = {
                order_status : true,
                paid: false
            };

            resolve(orderStatus);
        },1500);
    });
};

function payOrder(){
    return new Promise(resolve =>{
        setTimeout(()=>{
            const payOrderStatus ={
                Order_status: true,
                paid: true
            };
            resolve(payOrderStatus);
        })
    },1000);
}
async function restaurantFlow(){
    try{
        await getMenu();

        const orderBtn = document.getElementById("order-btn");
        const payBtn = document.getElementById("pay-btn");
        const orderStatusText = document.getElementById("order-status");
        const paymentStatusText = document.getElementById("payment-status");
        //  console.log(orderBtn);
        orderBtn.addEventListener("click", async ()=>{
            orderBtn.disabled = true;
            if(orderBtn.disabled){
                orderBtn.style.transform ="scale(1)";
                orderBtn.style.cursor = "default";
            }
            const order = await takeOrder();
             console.log(order);
             orderStatusText.style.color = "white";
             orderStatusText.innerText = "Wait Sometime Your Order is Prepare....";

             const orderStatus = await orderPrep();
             console.log("Order Status :", orderStatus);
             orderStatusText.innerText = "Your Order is Succesfully Prepared. Please Make a Payment !.";
        });
        // console.log(payBtn);
        payBtn.addEventListener("click", async()=>{
            payBtn.disabled = true;
            if(payBtn.disabled){
                payBtn.style.transform ="scale(1)";
                payBtn.style.cursor = "default";
            }
            const paymentStatus = await payOrder();
            console.log("Payment Status : ", paymentStatus);
            paymentStatusText.style.color = "white";
            paymentStatusText.textContent = "Payment Completed.";
            console.log("Thanyou For Eating my restaurant...");
            thankyouFun();
        });
    }
    catch(error){
        alert("Something Wrong Happens "+ error);
    }
};

// calling my Main function();
window.addEventListener("load", async ()=>{
    setTimeout(()=>{
        console.log("load restaurantFLow");
        restaurantFlow();
    }, 1000);
});

 function thankyouFun(){
    alert("Thankyou For Eating !");
};

