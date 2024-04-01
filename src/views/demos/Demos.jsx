/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation

 * ModusBox
 * Vijaya Kumar Guthi <vijaya.guthi@modusbox.com> (Original Author)
 --------------
 ******/
import React from 'react';
import { Row, Col } from 'antd';

class Demos extends React.Component {
    render() {
        return (
            <>
                <Row className='my-4'>
                    <Col span={24}>
                        <ul>
                            <li>
                                <a
                                    href='/mobilesimulator'
                                    target='_blank'
                                >
                  Mobile Simulator
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col span={24}>
                        <ul>
                            <li>
                                <a
                                    href='/payeemobile'
                                    target='_blank'
                                >
                  Payee App Simulator
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col span={24}>
                        <ul>
                            <li>
                                <a
                                    href='/payermobile'
                                    target='_blank'
                                >
                  Payer App Simulator
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col span={24}>
                        <ul>
                            <li>
                                <a
                                    href='/demotestrunner'
                                    target='_blank'
                                >
                  Test Runner (Demo friendly)
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col span={24}>
                        <ul>
                            <li>
                                <a
                                    href='/demomonitoring'
                                    target='_blank'
                                >
                  Demo Monitoring
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Demos;
