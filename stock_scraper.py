import requests
import csv

def get_data():
    r = requests.get("http://www.nasdaq.com/quotes/nasdaq-100-stocks.aspx?render=download")
    data = r.text
    fieldnames = ("Symbol", "Name", "lastsale", "netchange", "pctchange", "share_volume", "Nasdaq100_points")
    reader = csv.DictReader(data.splitlines(), fieldnames=fieldnames)
    reader.next()
    result = []
    for line in reader:
        result.append({
            "name": line["Name"],
            "symbol": line["Symbol"],
            "price": line["lastsale"],
            "netchange": line["netchange"],
            "pctchange": line["pctchange"],
            "volume": line["share_volume"],
            "value": line["Nasdaq100_points"]
        })
    return result

if __name__ == "__main__":
    get_data()