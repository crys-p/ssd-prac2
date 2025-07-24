import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

// Get the argument (default to 'local' if not provided)
const environment = process.argv[2] || 'local';

// URLs based on environment
// Obtain dev selenium server IP using: docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' selenium-server
const seleniumUrl = environment === 'github' 
  ? 'http://selenium:4444/wd/hub' 
  : 'http://localhost:4444/wd/hub';

// Note: Start the nodejs server before running the test locally
const serverUrl = environment === 'github' 
  ? 'http://testserver:3000/' 
  : 'http://host.docker.internal/';


async function runTest(moduleValue, expectedMsg, feedbackValue) {
  let driver = await new Builder().usingServer(seleniumUrl).forBrowser('chrome').build();
  try {
    await driver.get(serverUrl);
    await driver.findElement(By.id(moduleValue.toLowerCase())).click();
    await driver.findElement(By.id('feedback')).sendKeys(feedbackValue);
    await driver.findElement(By.css('button[type=submit]')).click();
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Thank you for your response!')]")), 5000);
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes(expectedMsg));
    assert(bodyText.includes(feedbackValue));
    console.log(`Test passed for module: ${moduleValue} with feedback: ${feedbackValue}`);
  } finally {
    await driver.quit();
  }
}

(async () => {
  await runTest('SSD', 'Ding ding! SSD is better!', 'Automated feedback for SSD');
  await runTest('ITP', 'Boooo! ITP is the worst!', 'Automated feedback for ITP');
})().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});