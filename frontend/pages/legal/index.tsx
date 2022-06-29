import React from "react";
import styled from "styled-components";
import { SecondaryHeadline } from "@css/typography";
import { Meta } from "@lib/meta";
import { content } from "@css/helper/content";
import { breakpoints } from "@css/helper/breakpoints";

const LegalWrapper = styled.div`
    ${content()};
    padding: 12rem 0;
`;

const LegalHeadline = styled(SecondaryHeadline)`
    margin-bottom: 1rem;
`;

const LegalInner = styled.div`
    ${breakpoints().min("l")} {
        max-width: 75%;
        margin: 0 auto;
    }
`;

const LegalGroup = styled.div`
    margin-bottom: 4rem;

    &:last-child {
        margin-bottom: 0;
    }

    p {
        font-weight: 300;
    }
`;

const Legal: React.FC = () => {
    return (
        <LegalWrapper>
            <Meta title="Legal - Live Music for Spotify" />
            <LegalInner>
                <LegalGroup>
                    <LegalHeadline>Contact Information</LegalHeadline>
                    <div>Information in accordance with Section 5 TMG</div>
                    <br />
                    <div>Tim Fuhrmann</div>
                    <div>Sandweg 19/1</div>
                    <div>74321 Bietigheim-Bissingen</div>
                    <div>Phone: +4917656870105</div>
                    <div>E-Mail: fuhrmann-tim@gmx.net</div>
                </LegalGroup>
                <LegalGroup>
                    <LegalHeadline>Disclaimer</LegalHeadline>
                    <div>Accountability for content</div>
                    <p>
                        The contents of our pages have been created with the utmost care. However, we cannot guarantee
                        the contents&apos; accuracy, completeness or topicality. According to statutory provisions, we
                        are furthermore responsible for our own content on these web pages. In this matter, please note
                        that we are not obliged to monitor the transmitted or saved information of third parties, or
                        investigate circumstances pointing to illegal activity. Our obligations to remove or block the
                        use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10
                        of the Telemedia Act (TMG).
                    </p>
                    <br />
                    <div>Accountability for links</div>
                    <p>
                        Responsibility for the content of external links (to web pages of third parties) lies solely
                        with the operators of the linked pages. No violations were evident to us at the time of linking.
                        Should any legal infringement become known to us, we will remove the respective link
                        immediately.
                    </p>
                    <br />
                    <div>Copyright</div>
                    <p>
                        Our web pages and their contents are subject to German copyright law. Unless expressly permitted
                        by law, every form of utilizing, reproducing or processing works subject to copyright protection
                        on our web pages requires the prior consent of the respective owner of the rights. Individual
                        reproductions of a work are only allowed for private use. The materials from these pages are
                        copyrighted and any unauthorized use may violate copyright laws.
                    </p>
                </LegalGroup>
            </LegalInner>
        </LegalWrapper>
    );
};

export default Legal;
