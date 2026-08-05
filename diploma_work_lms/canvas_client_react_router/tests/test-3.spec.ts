import { test, expect } from '@playwright/test';

test('everything', async ({ page }) => {
  // AI miatt
  test.setTimeout(120_000)

  await page.goto('http://localhost:5173/login')
  await page.getByRole('textbox', { name: 'neptunkód@inf.elte.hu' }).click();
  await page.getByRole('textbox', { name: 'neptunkód@inf.elte.hu' }).fill('test2@example.com');
  await page.getByRole('textbox', { name: 'neptunkód@inf.elte.hu' }).press('Tab');
  await page.getByRole('textbox', { name: 'Jelszó' }).fill('asdf1234');
  await page.getByRole('button', { name: 'Bejelentkezés' }).click();

  // hallgató bejelentkezett
  await expect(page.getByRole('button', { name: 'Hallgató Henrik Hallgató' })).toHaveCount(1)

  await page.getByRole('row', { name: 'Select row IP-18bPREE' }).getByRole('button').click();
  await page.getByRole('row', { name: 'ythlzcd625a75nq Programozá' }).getByRole('button').click();

  // Visszajelzés a tárgyfelvételről
  await expect(page.getByRole('region', { name: 'Notifications alt+T' }).getByRole('listitem')).toHaveCount(1)

  await page.getByRole('link', { name: 'Saját tantárgyak' }).click();
  await page.getByRole('button', { name: 'Tárgy leadása' }).first().click();

  // Visszajelzés a tárgyleadásról
  await expect(page.getByRole('region', { name: 'Notifications alt+T' }).getByRole('listitem')).toHaveCount(1)


  await page.getByRole('button', { name: 'Részletek' }).first().click();
  await page.getByRole('button', { name: 'Fájlok' }).click();

  // Kurzus fájljai megjelennek
  await expect(page.getByRole('dialog', { name: 'Kurzus fájljai' })).toHaveCount(1)

  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'AI összefoglaló' }).click();

  
  // Összefoglaló megjelenik
  await expect(page.getByRole('main')).toContainText('Összefoglaló', { timeout: 40_000 });

  await page.getByRole('button', { name: 'AI tanulókártyák' }).click();

  // Tanulókártyák megjelennek
  await expect(page.getByText('Tanulókártya 1 /')).toBeVisible({ timeout: 40_000 });

  
  await page.getByRole('link', { name: 'Előrehaladás' }).click();

  // Előrehaladás oldal helyesen megjelenik
  await expect(page.locator('div').filter({ hasText: 'Teljesítendő kreditekA szakir' }).nth(3)).toBeVisible();
  


  await page.getByRole('link', { name: 'Ütemterv' }).click();

  //Ütemterv megjelenik
  await expect(page.locator('div').filter({ hasText: '1. félév' }).nth(3)).toBeVisible();

  await page.getByRole('link', { name: 'Vizsgafelvétel' }).click();
  await page.getByRole('row', { name: 'IP-18AN1E Analízis I IP-' }).getByRole('combobox').click();
  await page.getByText('06. 19. 14:00 1/100 Bólyai 0-307').click();
  
  //Vizsgafelvétel visszajelzés
  await expect(page.getByRole('row', { name: 'IP-18AN1E Analízis I IP-' }).getByRole('button')).toHaveCount(1);
  await page.getByRole('row', { name: 'IP-18AN1E Analízis I IP-' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Vizsgajelentkezés törlése' }).click();

  //Vizsgatörlés visszajelzés
  await expect(page.getByRole('row', { name: 'IP-18AN1E Analízis I IP-' }).getByRole('button')).toHaveCount(0);



  await page.getByRole('button', { name: 'Hallgató Henrik Hallgató' }).click();
  await page.getByRole('menuitem', { name: 'Kijelentkezés' }).click();

  //sikeres kijelentkezés
  await expect(page.getByText('BejelentkezésÍrd be az email-ed és a jelszavadEmailJelszóBejelentkezésCsak az')).toBeVisible();

  
  await page.getByRole('textbox', { name: 'neptunkód@inf.elte.hu' }).click();
  await page.getByRole('textbox', { name: 'neptunkód@inf.elte.hu' }).fill('teacher2@example.com');
  await page.getByRole('textbox', { name: 'neptunkód@inf.elte.hu' }).press('Tab');
  await page.getByRole('textbox', { name: 'Jelszó' }).fill('asdf1234');
  await page.getByRole('button', { name: 'Bejelentkezés' }).click();

  // sikeres bejelentkezés tanárként
  await expect(page.getByText('Az általad adminisztrált tá')).toBeVisible();
  await page.getByRole('button', { name: 'Leírás módosítása' }).first().click();
  // Leírás módosítása ablak megjelenik
  await expect(page.getByRole('dialog', { name: 'Új leírás beállítása' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Fájlok módosítása' }).first().click();
  // Fájlok módosítása ablak megjelenik
  await expect(page.getByRole('dialog', { name: 'Kurzus fájljai' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Jegybeírás' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Válassz tárgyat' }).click();
  await page.getByText('Algoritmusok és').click();
  await page.getByRole('combobox').filter({ hasText: 'Válassz időpontot' }).click();
  await page.getByText('07. 01. 14:00').click();
  await page.getByRole('combobox').filter({ hasText: 'Válassz diákot' }).click();
  await page.getByRole('option', { name: 'Példa Péter' }).click();
  await page.getByRole('textbox', { name: 'Írd le a megjegyzésed...' }).click();
  await page.getByRole('textbox', { name: 'Írd le a megjegyzésed...' }).fill('teszt üzenet');
  await page.getByRole('combobox').filter({ hasText: 'Válassz értékelést' }).click();
  await page.getByRole('option', { name: '3' }).click();
  await page.getByRole('button', { name: 'Értékelés beküldése' }).click();

  // Visszajelzés a jegybeírásról megjelenik
  await expect(page.getByText('Jegy sikeresen beírva')).toBeVisible();

  

});


