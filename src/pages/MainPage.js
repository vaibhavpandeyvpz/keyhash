import React from 'react';
import logo from '../logo.svg';
import KeystoreReader from './KeystoreReader';
import HexToBase64 from './HexToBase64';

export default () => {
    return (
        <div>
            <div className="row justify-content-center mb-3">
                <div className="col-lg-10 col-xl-8">
                    <img alt="Keyhash" height="96" src={logo} />
                    <p className="mb-0">
                        Tool to generate <strong>SHA-1/SHA-256</strong> <em>Hex</em> or <em>Base64</em> values from signing certificates inside a Java keystore, required for setting up login with <strong>Facebook</strong> &amp; <strong>Google</strong> on Android.
                    </p>
                </div>
            </div>
            <div className="row justify-content-center mb-3">
                <div className="col-md-6 col-lg-5 col-xl-4">
                    <div className="mb-3 mb-md-0">
                        <KeystoreReader />
                    </div>
                </div>
                <div className="col-md-6 col-lg-5 col-xl-4">
                    <HexToBase64 />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-8">
                    <p className="text-muted mb-0">
                        <small style={{'lineHeight': '1em'}}>
                            <strong>Disclaimer:</strong> Names and logos used are property of their respective owners.
                            Open-source project by <a href="https://vaibhavpandey.com/">VPZ</a>, code hosted
                            at <a href="https://github.com/vaibhavpandeyvpz/keyhash">Github</a>.
                            Built with <i className="fas fa-heart text-danger"></i> in India.
                        </small>
                    </p>
                </div>
            </div>
        </div>
    )
}
