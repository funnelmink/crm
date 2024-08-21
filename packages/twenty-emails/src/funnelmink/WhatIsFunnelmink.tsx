import { Column, Row } from '@react-email/components';

import { Link } from 'src/components/Link';
import { MainText } from 'src/components/MainText';
import { ShadowText } from 'src/components/ShadowText';
import { SubTitle } from 'src/components/SubTitle';

export const WhatIsFunnelmink = () => {
    return (
        <>
            <SubTitle value="What is Funnelmink?" />
            <MainText>
                Software to help small and medium-sized businesses manage their customer data and
                relationships.
            </MainText>
            <Row>
                <Column>
                    <ShadowText>
                        <Link href="https://funnelmink.com/" value="Website" />
                    </ShadowText>
                </Column>
                <Column>
                    <ShadowText>
                        <Link href="https://github.com/funnelmink/crm" value="Github" />
                    </ShadowText>
                </Column>
                <Column>
                    <ShadowText>
                        <Link href="https://funnelmink.com/user-guide" value="User guide" />
                    </ShadowText>
                </Column>
                <Column>
                    <ShadowText>
                        <Link href="https://docs.funnelmink.com/" value="Developers" />
                    </ShadowText>
                </Column>
            </Row>
            <ShadowText>
                Funnelmink LLC
            </ShadowText>
        </>
    );
}