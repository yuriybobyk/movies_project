import React from 'react';
import {Banner, Row} from "../components";



const HomePage = () => {
    return (
        <div>
            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
                <Banner/>
                <section>
                    <Row title="Tranding Now" />
                    <Row title="Top Rated" />
                </section>
            </main>
        </div>
    );
};

export {HomePage}
