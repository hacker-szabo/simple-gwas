import {FC} from "react";
import { api } from "~/utils/api";



const NewsFeed: FC = () => {

    const latestNews = api.news.news.useQuery()

    return (<>
        <div>
            <marquee behavior="" direction="">
                {latestNews && latestNews.data && [...latestNews?.data]?.map((news) => (<>
                    <div className="inline-block bg-slate-300 ml-4 px-4 py-1 rounded-full">
                        {news.message}
                    </div>
                </>))}
            </marquee>
        </div>
    </>);
}

export default NewsFeed;
