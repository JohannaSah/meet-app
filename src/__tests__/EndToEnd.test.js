import puppeteer from "puppeteer";

describe('show/hide event details', ()=> {

    let browser;
    let page;
    beforeAll(async () => {
      jest.setTimeout(50000);
      browser = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ['--disable-extensions'] 
      });
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('.event');
    });

    afterAll(() => {
      browser.close();
    });

    test('An event element is collapsed by default', async () => {    
        const eventDetails = await page.$('.event .eventDetails');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {  
      await page.click('.event .detailsButton');
      const eventDetails = await page.$('.event .eventDetails');
      expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
      await page.click('.event .detailsButton');
      const eventDetails = await page.$('.event .eventDetails');
      expect(eventDetails).toBeNull();
    });

});

describe('Filter events by city', ()=> {

  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(50000);
    browser = await puppeteer.launch({
      headless:  true,
      ignoreDefaultArgs: ['--disable-extensions'] 
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user has not searched for a city, show upcoming events from all cities.', async () => {    
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toBeNull();
  });

  test('User should see a list of suggestions when they search for a city', async () => {  
    const searchedCity = await page.$('.suggestions li');
    expect(searchedCity).toBeDefined();
  });

  test('User can select a city from the suggested list', async () => {
    await page.reload();
    await page.type('.city', 'Berlin', { delay: 150 });
    await page.click('.suggestions li');
    await page.waitForSelector('.event');
    const selectedCity = await page.$eval('.city', (element) => element.value);
    expect(selectedCity).toEqual('Berlin, Germany');
  });

});