import asyncio
import csv
from pathlib import Path
from playwright.async_api import async_playwright

async def scrape_ipocentral():
    url = "https://ipocentral.in/ipo-discussion/"
    base_dir = Path(__file__).resolve().parent
    output_dir = base_dir / "output_scraper"
    output_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context()
        page = await ctx.new_page()
        await page.goto(url, wait_until="networkidle")

        tables = [("mainboard", "#tablepress-57"), ("sme", "#tablepress-58")]
        for name, selector in tables:
            await page.wait_for_selector(selector)
            table = await page.query_selector(selector)
            headers = await table.query_selector_all("thead tr th")
            header_names = [await h.inner_text() for h in headers]
            rows = await table.query_selector_all("tbody tr")
            data = []
            for row in rows:
                cells = await row.query_selector_all("td")
                data.append([await cell.inner_text() for cell in cells])
            csv_path = output_dir / f"ipocentral_{name}.csv"
            with csv_path.open("w", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerow(header_names)
                writer.writerows(data)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(scrape_ipocentral())
