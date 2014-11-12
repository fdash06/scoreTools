# URLにアクセスするためのライブラリの読み込み
require 'open-uri'
# Nokogiriライブラリの読み込み
require 'nokogiri'

require "kconv"


# スクレイピング先のURL
url = "http://www21.atwiki.jp/asigami/pages/18.html" 
charset = nil
html = open(url) do |f|
    charset = f.charset # 文字種別を取得
    f.read # htmlを読み込んで変数htmlに渡す
end

# htmlをパース(解析)してオブジェクトを生成
doc = Nokogiri::HTML.parse(html.toutf8, nil,"utf-8")
puts doc.title
puts ""

doPrint = false;
str = ""
count = 0
doc.css("td").each do |node|
    word = node.text.strip
    if doPrint then
        if count == 3 then
            str += word
            count = 0
            puts str
            str = ""
        else 
            str += word +","
            count = count +1
        end 
    end

    

    if word == "NOTES/FREEZE(SHOCK)" then
        doPrint = true
    end

end
