from playwright.sync_api import sync_playwright

URL = "https://www.publix.com/savings/weekly-ad/bogo"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    page.goto(URL, wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(15000)

    # Save full visible page text for debugging
    full_text = page.locator("body").inner_text()
    with open("publix_debug.txt", "w", encoding="utf-8") as file:
        file.write(full_text)

    # Grab likely product/deal cards
    cards = page.locator("article, [class*=card], [class*=product], [class*=deal]").all()

    deals = []

    for card in cards:
        try:
            card_text = card.inner_text().strip()
        except:
            continue

        if not card_text:
            continue

        upper = card_text.upper()

        # Keep only cards that look like sale/deal cards
        if "SAVE" not in upper and "BOGO" not in upper and "BUY ONE" not in upper:
            continue

        lines = [line.strip() for line in card_text.splitlines() if line.strip()]

        for line in lines:
            line_upper = line.upper()

            # Skip obvious junk
            if len(line) < 5:
                continue
            if "SAVE" in line_upper:
                continue
            if "SHOP" in line_upper:
                continue
            if "$" in line:
                continue
            if "OF EQUAL OR LESSER PRICE" in line_upper:
                continue
            if "VIEW THE WEEKLY" in line_upper:
                continue
            if "GO TO IMAGE" in line_upper:
                continue
            if "BACK TO TOP" in line_upper:
                continue

            deals.append(line)
            break

    # Remove duplicates while preserving order
    deals = list(dict.fromkeys(deals))

    junk_phrases = [
        "results",
        "clip coupon",
        "sweet berry savings",
        "back to top",
        "view the weekly ad",
        "go to image",
        "of equal or lesser price",
        "find more ways to save",
    ]

    cleaned_deals = []

    for deal in deals:
        deal_lower = deal.lower()

        if any(junk in deal_lower for junk in junk_phrases):
            continue

        if len(deal) < 5:
            continue

        cleaned_deals.append(deal)

    # Remove duplicates again after cleaning
    cleaned_deals = list(dict.fromkeys(cleaned_deals))

    with open("deals.txt", "w", encoding="utf-8") as file:
        file.write("\n".join(cleaned_deals[:75]))

    print(f"Saved {len(cleaned_deals[:75])} cleaned product names to deals.txt")
    print("Also saved full page text to publix_debug.txt")

    browser.close()