import Agency from "./agency"
import Body from "./body"
import React from "react"
import styled from "@emotion/styled"

const HeadAreaStyled = styled.div`
    font-size: 1.13rem;
    line-height: 1.6;
    font-weight: 200;
    margin-bottom: 5.4rem;
`

const HeadAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    p {
        margin-top: 0;
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
        flex-direction: row;
        justify-content: space-between;
    }
`

const BodyWidth = styled.div`
    max-width: ${props => props.theme.sizes.contentMaxWidth};
`

const HeadContent = ({ body, agency }) => {
    return (
        <HeadAreaStyled>
            <HeadAreaContainer>
                <BodyWidth>
                    <Body heading text={body} />
                </BodyWidth>
                {agency && <Agency content={agency} />}
            </HeadAreaContainer>
        </HeadAreaStyled>
    )
}

export default HeadContent
