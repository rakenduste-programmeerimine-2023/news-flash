export default function NewsDisplayMajandus(props: { news: any }) {
    const filterNewsByKeyword = (newsEntries: any[]) => {
        return newsEntries.filter(newsEntry => {
          const keywords = newsEntry.keywords;
      
            if (typeof keywords === 'string' && keywords.toLowerCase().includes("majandus")) {
                return true;
            } else if (Array.isArray(keywords) && keywords.some(keyword => typeof keyword === 'string' && keyword.toLowerCase().includes("majandus"))) {
                return true;
            }
          return false;
        });
    };

    const filteredNews = filterNewsByKeyword(props.news.results);
  
    const newsInList = filteredNews.map(newsEntry => {
      return (
        <div
          className="border-solid rounded border-8 my-8 text-black border-red-900 p-2"
          key={newsEntry.article_id}
        >
          <a href={newsEntry.link} className="font-bold">
            {newsEntry.title}
          </a>
          <p>{newsEntry.description}</p>
        </div>
      );
    });
  
    return (
      <ul className="overflow-hidden overflow-y-scroll h-[97%]">{newsInList}</ul>
    );
  }
  