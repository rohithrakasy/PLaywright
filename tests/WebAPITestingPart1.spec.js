const {test,request, expect}=require('@playwright/test');

const loginRequestData = {userEmail:"rkrchintu@gmail.com",userPassword:"Test@1234"};

test.beforeAll(async ()=>{

    const apiContext=await request.newContext();

    const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginRequestData
        }
    );

    await expect(loginResponse.ok).toBeTruthy();
    const loginResponseJson= await loginResponse.json();
    const fetchToken= loginResponseJson.token;
    console.log("token : "+ fetchToken);
});

test("API Testing using playwright", async ({browser}) =>{

    const context= await browser.newContext();
    const page= await context.newPage();
    
})