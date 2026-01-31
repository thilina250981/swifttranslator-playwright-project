const { test, expect } = require("@playwright/test");

const SITE_URL = "https://www.swifttranslator.com/";


async function openSite(page) {
  await page.goto(SITE_URL, { waitUntil: "domcontentloaded" });
}

function getInputLocator(page) {
  return page.getByPlaceholder("Input Your Singlish Text Here.");
}

function getOutputLocator(page) {
  return page.locator('.card:has-text("Sinhala") .bg-slate-50').first();
}


async function readOutput(locator) {
  
  const t = await locator.innerText().catch(async () => await locator.textContent());
  return (t || "").replace(/\r\n/g, "\n");
}


function normalize(s) {
  return (s || "").replace(/\r\n/g, "\n").trim();
}

async function triggerTranslation(inputArea) {
  await inputArea.press("Space");
  await inputArea.press("Backspace");
}

// --------- Test Data (Positive test data) ----------
const positiveCases = [
  {
    id: "Pos_Fun_0001",
    input: "mama kathandhara potha balanava.",
    expected: "මම කතන්දර පොත බලනව."
  },
  {
    id: "Pos_Fun_0002",
    input: "e aedhuma ganna oona una , eeth gaana vaedi.",
    expected: "එ ඇදුම ගන්න ඕන උන , ඒත් ගාන වැඩි."
  },
  {
    id: "Pos_Fun_0003",
    input: "eyaa dhaen inne colombo dha?",
    expected: "එයා දැන් ඉන්නේ colombo ද?"
  },
  {
    id: "Pos_Fun_0004",
    input: "mama kiyana dhee hodhin ahaganna.",
    expected: "මම කියන දේ හොදින් අහගන්න."
  },
  {
    id: "Pos_Fun_0005",
    input: "eyaalaa hodhin igena gannavaa.",
    expected: "එයාලා හොදින් ඉගෙන ගන්නවා."
  },
  {
    id: "Pos_Fun_0006",
    input: "mama adha panthi giye nae.",
    expected: "මම අද පන්ති ගියෙ නැ."
  },
  {
    id: "Pos_Fun_0007",
    input: "oba dhaenaganna laebima sathutak.",
    expected: "ඔබ දැනගන්න ලැබිම සතුටක්."
  },
  {
    id: "Pos_Fun_0008",
    input: "ov, mata eeka karanna puluvan.",
    expected: "ඔව්, මට ඒක කරන්න පුලුවන්."
  },
  {
    id: "Pos_Fun_0009",
    input: "karuNaakarala oyaata tikak velaa mama enakan inna puluvandha?",
    expected: "කරුණාකරල ඔයාට ටිකක් වෙලා මම එනකන් ඉන්න පුලුවන්ද?"
  },
  {
    id: "Pos_Fun_0010",
    input: "bath tika okkoma kaapan!!",
    expected: "බත් ටික ඔක්කොම කාපන්!!"
  },
  {
    id: "Pos_Fun_0011",
    input: "dhaen nam epaa vela thiyenne.",
    expected: "දැන් නම් එපා වෙල තියෙන්නෙ."
  },
  {
    id: "Pos_Fun_0012",
    input: "machan, 5ta pick up karanna puluvandha?",
    expected: "මචන්, 5ට pick up කරන්න පුලුවන්ද?"
  },
  {
    id: "Pos_Fun_0013",
    input: "api sellam karanavaa",
    expected: "අපි සෙල්ලම් කරනවා"
  },
  {
    id: "Pos_Fun_0014",
    input: "mee mee, eyalaa vaeda godak karanava.",
    expected: "මේ මේ, එයලා වැඩ ගොඩක් කරනව."
  },
  {
    id: "Pos_Fun_0015",
    input: "sahan , amal issara kotayi.",
    expected: "සහන් , අමල් ඉස්සර කොටයි."
  },
  {
    id: "Pos_Fun_0016",
    input: "adha 2026.01.27 dhinaya vee.",
    expected: "අද 2026.01.27 දිනය වේ."
  },
  {
    id: "Pos_Fun_0017",
    input: "heta udhee , mama anivaren ennam!!! Oya enava nedha??",
    expected: "හෙට උදේ , මම අනිවරෙන් එන්නම්!!! ඔය එනව නේද??"
  },
  {
    id: "Pos_Fun_0018",
    input: "yaaluvoo okkama paadam karanavaa.",
    expected: "යාලුවෝ ඔක්කම පාඩම් කරනවා."
  },
  {
    id: "Pos_Fun_0019",
    input: "mata meekata udhav karanna puluvandha?",
    expected: "මට මේකට උදව් කරන්න පුලුවන්ද?"
  },
  {
    id: "Pos_Fun_0020",
    input: "Youtube ekee video balanna, airplane mode ayin karanna.",
    expected: "Youtube එකේ video බලන්න, airplane mode අයින් කරන්න."
  },
  {
    id: "Pos_Fun_0021",
    input: "kalin office yanna kandy idhan matale ta car ekek book karaa.",
    expected: "කලින් office යන්න kandy ඉදන් matale ට car එකෙක් book කරා."
  },
  {
    id: "Pos_Fun_0022",
    input: "OTP eka aevilla, mata kiyapan.",
    expected: "OTP එක ඇවිල්ල, මට කියපන්."
  },
  {
    id: "Pos_Fun_0023",
    input: "ela ban! RS.200 dhenna puluvandha?",
    expected: "එල බන්! RS.200 දෙන්න පුලුවන්ද?"
  },
  {
    id: "Pos_Fun_0024",
    input: "sini 5kg aran yamu.",
    expected: "සිනි 5kg අරන් යමු."
  },
  {
    id: "Pos_Fun_0025",
    input: "mama 12pm -2pm free ban.",
    expected: "මම 12pm -2pm free බන්."
  },
  {
    id: "Pos_Fun_0026",
    input: "mama   godak      usayi.",
    expected: "මම   ගොඩක්      උසයි."
  },
  {
    id: "Pos_Fun_0027",
    input: "heta apita nivaadu. \nudheema hambemu.",
    expected: "හෙට අපිට නිවාඩු. \nඋදේම හම්බෙමු."
  },
  {
    id: "Pos_Fun_0028",
    input:
      "ran mila ihala yaame pravanathaavayata anuva lanka ran pavumaka mila ihala gos thibee.kolaBA pitakotuva ran velandhapole velendho varthaa karanne ran pavumaka mila rupiyal 12,000 kin pamana ihala gos athi bavayi.e anuva, kaeret 24 ran pavumaka vathman mila rupiyal 362,200 k vana atara kaeret 22 ran pavumaka mila rupiyal 397,000 ki.",
    expected:
      "රන් මිල ඉහල යාමෙ ප්‍රවනතාවයට අනුව ලන්ක රන් පවුමක මිල ඉහල ගොස් තිබේ.කොලඹ පිටකොටුව රන් වෙලන්දපොලෙ වෙලෙන්දො වර්තා කරන්නේ රන් පවුමක මිල රුපියල් 12,000 කින් පමන ඉහල ගොස් අති බවයි.එ අනුව, කැරෙට් 24 රන් පවුමක වත්මන් මිල රුපියල් 362,200 ක් වන අටර කැරෙට් 22 රන් පවුමක මිල රුපියල් 397,000 කි."
  },
  {
    id: "Pos_Fun_0029",
    input: "patta bn!!! uba nam vaeddek!!",
    expected: "පට්ට බ්න්!!! උබ නම් වැඩ්ඩෙක්!!"
  }
];

// --------- Test Data (Negative test data) ----------
const negativeCases = [
  {
    id: "Neg_Fun_0001",
    input: "mama panthi yanawaa.",
    expected: "මම පන්ති යනවා."
  },
  {
    id: "Neg_Fun_0002",
    input: "netflix balamu.",
    expected: "netflix බලමු."
  },
  {
    id: "Neg_Fun_0003",
    input: "oyaharimalassanai",
    expected: "ඔයහරිමලස්සනයි"
  },
  {
    id: "Neg_Fun_0004",
    input: "hellooo!!!!!!",
    expected: "හෙලෝ!!!!!!!"
  },
  {
    id: "Neg_Fun_0005",
    input: "Budu ammo!!",
    expected: "බුදු අම්මෝ!!"
  },
  {
    id: "Neg_Fun_0006",
    input: "karunaakaralaa vinadiyak inna.",
    expected: "කරුණාකරලා විනඩියක් ඉන්න."
  },
  {
    id: "Neg_Fun_0007",
    input: "mama Sri Lanka puravasiyek.",
    expected: "මම ශ්‍රි ලංකා පුරවසියෙක්."
  },
  {
    id: "Neg_Fun_0008",
    input: "ehema naaa.",
    expected: "එහෙම නෑ"
  },
  {
    id: "Neg_Fun_0009",
    input: "hari dee karanna.",
    expected: "හරි දේ කරන්න."
  },
  {
    id: "Neg_Fun_0010",
    input: "mama eeye gedara aawaa.",
    expected: "මම ඊයේ ගෙදර ආවා."
  }
];

// --------- Tests ----------
test("open swifttranslator", async ({ page }) => {
  await openSite(page);

  const pageTitle = await page.title();
  console.log("page title is:", pageTitle);

  await expect(page).toHaveURL(SITE_URL);
  await expect(page).toHaveTitle(/Translator/i);
});

test.describe("SwiftTranslator – Positive Functional", () => {
  for (const tc of positiveCases) {
    test(`${tc.id} – should match expected Sinhala output`, async ({ page }) => {
      await openSite(page);

      const inputArea = getInputLocator(page);
      const outputBox = getOutputLocator(page);

      await inputArea.waitFor({ state: "visible", timeout: 10000 });

      await inputArea.fill(tc.input);
      await triggerTranslation(inputArea); 

      
      await expect.poll(async () => normalize(await readOutput(outputBox)), {
        timeout: 30000,
        message: `No output produced for ${tc.id}`
      }).not.toBe("");

      
      await expect.poll(async () => normalize(await readOutput(outputBox)), {
        timeout: 30000,
        message: `Output did not match for ${tc.id}`
      }).toBe(normalize(tc.expected));
    });
  }
});


test.describe("SwiftTranslator – Negative Functional", () => {
  for (const tc of negativeCases) {
    test(`${tc.id} – should match expected Sinhala output`, async ({ page }) => {
      await openSite(page);

      const inputArea = getInputLocator(page);
      const outputBox = getOutputLocator(page);

      await inputArea.waitFor({ state: "visible", timeout: 10000 });
      await inputArea.fill(tc.input);

      await expect
        .poll(async () => normalize(await readOutput(outputBox)), {
          timeout: 20000,
          message: `Output did not match for ${tc.id}`
        })
        .toBe(normalize(tc.expected));
    });
  }
});

test("Pos_UI_0001 – Clearing input clears Sinhala output immediately", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });

  
  await inputArea.fill("api heta hambemu.");

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 20000,
      message: "No output produced"
    })
    .not.toBe("");

  
  await inputArea.fill("");

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 15000,
      message: "Output did not clear after clearing the input"
    })
    .toBe("");
});

test("Neg_UI_0001 – should respond within time for long gibberish input", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });

  const before = normalize(await readOutput(outputBox));
  const start = Date.now();

  await inputArea.fill(
    "ffnfnmlfnmltn fjnbfkrrh rkhmmlm tmhl5my5lye5lymolkjuyml hmyljmlt jtnhrenno nhkrehohnmkhmtm h5khm5olho 5o"
  );

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)) !== before, {
      timeout: 1000,
      message: "UI did not respond within 2000ms"
    })
    .toBe(true);

  const elapsed = Date.now() - start;
  expect(elapsed).toBeLessThanOrEqual(2000);
});
