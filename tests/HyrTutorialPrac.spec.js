const { test, expect } = require("@playwright/test");
const { parse } = require("node:path");

test("Practice Playwright with Hyr Website", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.hyrtutorials.com/");

  await page.locator("[title='HYR']").waitFor();

  // (await page).waitForLoadState('networkidle');

  // // Close ad popup if it appears
  // const adCloseBtn = page.getByText('Close');
  // if (await adCloseBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
  //     await adCloseBtn.click();
  // }

  const menuDetails = (await page).locator(".menu-wrap div li a");

  const count = await menuDetails.count();

  for (let i = 0; i < count; ++i) {
    const fetchMenuVal = await menuDetails.nth(i).textContent();
    if (fetchMenuVal.includes("Selenium Practice")) {
      await menuDetails.nth(i).click();
      // console.log(menuDetails.nth(i).textContent());
      await page.locator("[href*='window-handles-practice']").first().click();
      //   await page.pause();
      break;
    }
  }

  const titleOfPage = await page
    .locator("[itemprop='name']")
    .last()
    .textContent();
  console.log(titleOfPage);

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("#newWindowBtn").click(),
  ]);

  await newPage.waitForLoadState("domcontentloaded");

  await newPage.locator(".basicControls input").nth(0).fill("Rohith");
  await newPage.locator(".basicControls input").nth(1).fill("Laxmi");
  await newPage.locator(".basicControls input").nth(2).click();
  await newPage.locator(".basicControls input").nth(3).click();
  await newPage.locator(".basicControls input").nth(4).click();
  await newPage.locator(".basicControls input").nth(5).click();
  await newPage.locator("[placeholder='Enter Email']").fill("rkr@gmail.com");
  await newPage.locator("[placeholder='Enter Password']").fill("Test@1234");

  // await newPage.getByPlaceholder("Enter First Name").fill("Rohith kumar");
  // await newPage.getByPlaceholder("Enter Last Name").fill("laxmi");
  // await newPage.locator(".basicControls input").nth(3).click();

  console.log(await newPage.locator("input#firstName").inputValue());

  const registerBtn = newPage.locator("#registerbtn");

  await registerBtn.click();
  const successMsg = await newPage.locator("label#msg").textContent();
  console.log(successMsg);
  await expect(successMsg).toContain("Successful");

  // Clear all fields and Validate First name has null value
  const clearBtn = newPage.locator("#clearbtn");

  const fetchAfterClear = await newPage
    .locator(".basicControls input")
    .nth(0)
    .inputValue();
  console.log(fetchAfterClear);
  if (await fetchAfterClear.match("")) {
    console.log("PASS");
  }

  //   await newPage.pause();
  await newPage.close();
  await page.bringToFront();

  await page.locator("").f;

  //await page.pause();
});

function futureDateValue() {
  const date = new Date();
  date.setDate(date.getDate() + 7); // Set date from 7 days in futureDateValue

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = "14";
  const minutes = "25";

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

test("Assignment 1", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com");

  //SignIn to the Application

  await page.getByPlaceholder("you@email.com").fill("rkrchintu@gmail.com");
  await page.getByLabel("Password").fill("Test@1234");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Assert Home page is loaded by validating Browse events text
  await page.waitForLoadState("domcontentloaded");
  await expect(await page.getByText("Browse Events →")).toBeVisible();

  // Navigate to Admin eventhub
  await page.getByRole("button", { name: "Admin" }).click();
  await page.getByRole("link", { name: "Manage Events" }).nth(0).click();

  //Genarate unique title using timestamp and Fill details
  const titleName = `Test Event ${Date.now()}`;
  console.log(titleName);

  await page.locator("#event-title-input").fill(titleName);
  await page.getByPlaceholder("Describe the event…").fill("Test");

  await page.locator("#category").selectOption("Concert");
  await page.getByLabel("City").fill("Hyderabad");
  await page.getByLabel("Venue").fill("Hitex Center");
  await page.getByLabel("Event Date & Time").fill(futureDateValue());
  await page.getByLabel("Price ($)").fill("150");
  await page.getByLabel("Total Seats").fill("150");
  await page.getByRole("button", { name: "+ Add Event" }).click();

  await expect(page.getByText("Event created!")).toBeVisible();

  //Navigate to Events and find a Seats
  // await page.getByRole("navigation",{name:'Events'}).click();
  await page.locator("[data-testid='nav-events']").click();
  await page.getByPlaceholder("Search events, venues…").fill(titleName);

  await page.locator("[data-testid='event-card']").first().waitFor();

  await expect(page.locator("[data-testid='event-card'] h3")).toHaveText(
    titleName,
  );

  const totalSeatsText = await page
    .locator("span.text-xs")
    .last()
    .textContent();
  console.log(totalSeatsText);

  const seats = totalSeatsText.split(" ");
  const totalSeatsBeforeBooking = parseInt(seats[0]);
  console.log(totalSeatsBeforeBooking);

  // start booking
  await page.getByText("Book Now").click();
  // await page.locator("#book-now-btn").click();

  await page.getByLabel("Full Name").fill("Rohith");
  await page.getByLabel("Email").fill("rkrchintu@gmail.com");
  await page.getByLabel("Phone Number").fill("9706452378");

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  //Validate Booking Success text
  await expect(page.getByText("Booking Confirmed!")).toContainText(
    "Booking Confirmed!",
  );

  const bookingRef = await page.locator(".booking-ref").textContent();
  console.log("Ticket Number: " + bookingRef);

  //Validate booking in My Bookings page
  await page.locator("[data-testid='nav-bookings']").click();

  await expect(page).toHaveURL(
    "https://eventhub.rahulshettyacademy.com/bookings",
  );

  await page.locator("#booking-card h3").first().waitFor();
  const myBookingsCount = await page.locator("#booking-card h3").count();
  console.log("Count: " + myBookingsCount);

  for (let i = 0; i < myBookingsCount; i++) {
    const fetchTitle = await page
      .locator("#booking-card h3")
      .nth(i)
      .textContent();
    if (fetchTitle.trim() === titleName) {
      console.log("Pass");
      await expect(page.locator("#booking-card h3").nth(i)).toHaveText(
        titleName,
      );
      break;
    }
  }

  // navigate back to Event for seats reduction
  await page.locator("[data-testid='nav-events']").click();
  await page.getByPlaceholder("Search events, venues…").fill(titleName);

  // await page.locator("[data-testid='event-card']").first().waitFor();

  await page.waitForResponse(
    (resp) => resp.url().includes("search") && resp.status() === 200,
  );

  await expect(page.locator("[data-testid='event-card'] h3")).toHaveText(
    titleName,
  );

  const totalSeatsTextAfterBooking = await page
    .locator("span.text-xs")
    .last()
    .textContent();
  console.log(totalSeatsTextAfterBooking);

  const seatsAfterBooking = totalSeatsTextAfterBooking.split(" ");
  const totalSeatsAfterBooking = parseInt(seatsAfterBooking[0]);
  console.log(totalSeatsAfterBooking);

  expect(totalSeatsAfterBooking).toBe(totalSeatsBeforeBooking - 1);

  await page.pause();
});

test("Assignment 2 --> validate Ticket is refundable for One member", async ({
  page,
}) => {
  const baseUrl = "https://eventhub.rahulshettyacademy.com";

  await page.goto(baseUrl + "/login");

  //SignIn to the Application

  await page.getByPlaceholder("you@email.com").fill("rkrchintu@gmail.com");
  await page.getByLabel("Password").fill("Test@1234");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Assert Home page is loaded by validating Browse events text
  await page.waitForLoadState("domcontentloaded");
  await expect(await page.getByText("Browse Events →")).toBeVisible();

  //NAvigate to Events page
  await page.locator("[data-testid='nav-events']").click();

  // await page.waitForResponse(resp => resp.url.includes("events") && resp.status()===200);
  await page.locator("#event-card a#book-now-btn").first().waitFor();

  await page.locator("#event-card a#book-now-btn").first().click();

  await page.getByLabel("Full Name").fill("Rohith");
  await page.getByLabel("Email").fill("rkrchintu@gmail.com");
  await page.getByLabel("Phone Number").fill("9706452378");

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  await expect(page.getByText("Booking Confirmed!")).toContainText(
    "Booking Confirmed!",
  );

  //Navigate to My Bookings
  await page.locator("[data-testid='nav-bookings']").click();

  await expect(page).toHaveURL(baseUrl + "/bookings");

  await page
    .locator("#booking-card")
    .filter({ hasText: "View Details" })
    .getByRole("button", { name: "View Details" })
    .nth(0)
    .click();

  const bookingRef = await page.locator("span.font-mono").first().textContent();
  console.log(bookingRef);

  const firstCharBookingRef = await bookingRef.charAt(0);
  console.log("First Char in Booking Ref: " + firstCharBookingRef);

  const title = await page.locator("h1.text-2xl").textContent();
  const firstCharAtTitle = await title.charAt(0);
  console.log("First Char in Title: " + firstCharAtTitle);

  await expect(firstCharBookingRef).toBe(firstCharAtTitle);

  await page
    .getByRole("button", { name: "Check eligibility for refund?" })
    .click();

  await page.locator("#refund-result").waitFor();

  await expect(page.locator("#refund-result span")).toContainText(
    "Eligible for refund",
  );

  await page.pause();
});

test("Assignment 2 --> validate Ticket is Not-Refundable for Three members", async ({
  page,
}) => {
  const baseUrl = "https://eventhub.rahulshettyacademy.com";

  await page.goto(baseUrl + "/login");

  //SignIn to the Application

  await page.getByPlaceholder("you@email.com").fill("rkrchintu@gmail.com");
  await page.getByLabel("Password").fill("Test@1234");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Assert Home page is loaded by validating Browse events text
  await page.waitForLoadState("domcontentloaded");
  await expect(await page.getByText("Browse Events →")).toBeVisible();

  //NAvigate to Events page
  await page.locator("[data-testid='nav-events']").click();

  // await page.waitForResponse(resp => resp.url.includes("events") && resp.status()===200);
  await page.locator("#event-card a#book-now-btn").first().waitFor();

  await page.locator("#event-card a#book-now-btn").first().click();

  for (let i = 1; i < 3; ++i) {
    await page.getByRole("button", { name: "+" }).click();
  }

  await page.getByLabel("Full Name").fill("Rohith");
  await page.getByLabel("Email").fill("rkrchintu@gmail.com");
  await page.getByLabel("Phone Number").fill("9706452378");

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  await expect(page.getByText("Booking Confirmed!")).toContainText(
    "Booking Confirmed!",
  );

  const fetchBookingRef = await page.locator("span.booking-ref").textContent();
  console.log("Booking Ref: " + fetchBookingRef);

  //Navigate to My Bookings
  await page.locator("[data-testid='nav-bookings']").click();

  await expect(page).toHaveURL(baseUrl + "/bookings");

  await page
    .locator("#booking-card")
    .filter({ hasText: "View Details" })
    .getByRole("button", { name: "View Details" })
    .nth(0)
    .click();

  await page
    .getByRole("button", { name: "Check eligibility for refund?" })
    .click();

  await page.locator("#refund-result").waitFor();

  await expect(page.locator("#refund-result span")).toContainText(
    "Not eligible for refund",
  );

  await page.pause();
});

async function searchForField(page, fieldName, locator) {
  const countList = await page.locator("#nav1 li a").count();
  console.log("Count: " + countList);

  for (let i = 0; i < countList; ++i) {
    const btnName = await page.locator("#nav1 li a").nth(i).textContent();

    if (btnName.trim() === fieldName) {
      await page.locator("#nav1 li a").nth(i).hover();
      await page.locator(locator).click();
      break;
    }
  }
}

test("Hyr Tutorial Assignment Alert and Mouse Hovers", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const baseUrl = "https://www.hyrtutorials.com/";
  await page.goto(baseUrl);

  await searchForField(
    page,
    "Selenium Practice",
    "[href*='window-handles-practice']",
  );

  await expect(
    page.getByRole("heading", { name: "Window Handles Practice" }),
  ).toBeVisible();

  //To open a new window and validate Alert Boxes

  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("button", { name: "Open New Tab" }).click(),
  ]);

  await expect(
    newTab.getByRole("heading", { name: "AlertsDemo" }),
  ).toBeVisible();

  // newTab.on("dialog", (dialog) => dialog.accept());

  await page.pause();

  // newTab.on("dialog",dialog=> dialog.dismiss());

  await newTab.once("dialog", async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  });

  await newTab.locator("#alertBox").click();
  console.log("Acknwoledge clicked 1st box");

  await newTab.once("dialog", async (dialog) => {
    console.log(dialog.message());
    await dialog.dismiss();
  });

  await newTab.locator("#confirmBox").click();
  console.log("Acknwoledge Cancel button for 2nd Alert box");
});

test.only('Handling Frames',async({page}) =>
{

  await page.goto("https://www.hyrtutorials.com/");

  await searchForField(page,"Selenium Practice","[href*='frames-practice']");

  await expect(page.getByRole("heading",{name:'Frames Practice'})).toBeVisible();

  const framePage=page.frameLocator("#frm1");

  await framePage.locator("#selectnav1").selectOption("- SQL");

  const selectedVal=await framePage.locator("#selectnav1 option:checked").textContent();

  await expect(selectedVal).toContain("SQL");

})
