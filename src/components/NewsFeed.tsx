import { type FC } from "react";
import { api } from "~/utils/api";

import Marquee from "react-fast-marquee";

const NewsFeed: FC = () => {

    const latestNews = api.news.news.useQuery()

    return (<>
        <div>
            <Marquee direction="left" pauseOnHover={true}
            gradient={true}
            gradientWidth={50}
            autoFill={false}>
                {latestNews && latestNews.data && [...latestNews?.data]?.map((news) => (<>
                    <div className="inline-block bg-slate-300 ml-4 px-4 py-1 rounded-full">
                        {news.message}
                    </div>
                </>))}
            </Marquee>
        </div>
    </>);
}

export default NewsFeed;
