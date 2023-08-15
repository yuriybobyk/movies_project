import React from 'react';
import {Banner, NowPalyingRow, TopRatedRow, TrendingRow} from "../components";



const HomePage = () => {
    return (
        <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
                <Banner/>
                <section className="md:space-y-32 lg:space-y-40">
                    <NowPalyingRow title="Now Playing"/>
                    <TrendingRow title={"Trending Now"}/>
                    <TopRatedRow title={"Top Rated"}/>
                </section>
            </main>
        </div>
    );
};

export {HomePage}
