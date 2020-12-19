import classNames from 'classnames';
import jks from 'jks-js';
import jsSHA from 'jssha';
import React, { useState } from 'react';

export default () => {
    const [errors, setErrors] = useState({});
    const [hashes, setHashes] = useState([]);
    const [keystore, setKeystore] = useState(null);
    const [passphrase, setPassphrase] = useState(null);
    const handleReset = () => {
        setHashes([]);
        setKeystore(null);
        setPassphrase(null);
    };
    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
        setHashes([]);
        const reader = new FileReader();
        reader.onload = e => {
            try {
                const certificates = jks.parseJks(e.target.result, passphrase);
                if (certificates.length > 0) {
                    const results = [];
                    certificates.forEach(certificate => {
                        const sha1 = new jsSHA('SHA-1', 'UINT8ARRAY', { encoding: 'UTF8' });
                        sha1.update(certificate.chain[0].value);
                        const sha1hex = sha1.getHash('HEX');
                        const sha1fingerprint = Array.from(sha1.getHash('UINT8ARRAY'), function(byte) {
                            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
                        }).join(':');
                        const sha256 = new jsSHA('SHA-256', 'UINT8ARRAY', { encoding: 'UTF8' });
                        sha256.update(certificate.chain[0].value);
                        const sha256hex = sha256.getHash('HEX');
                        const sha256fingerprint = Array.from(sha256.getHash('UINT8ARRAY'), function(byte) {
                            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
                        }).join(':');
                        const base64 = sha1.getHash('B64');
                        results.push({
                            alias: certificate.alias,
                            sha1hex,
                            sha1fingerprint: sha1fingerprint.toUpperCase(),
                            sha256hex,
                            sha256fingerprint: sha256fingerprint.toUpperCase(),
                            base64,
                        })
                    });
                    setHashes(results);
                } else {
                    setErrors({ 'passphrase': 'The keystore is empty (no keys or aliases inside).' })
                }
            } catch (e) {
                console.log(e);
                setErrors({ 'passphrase': 'Either or both of keystore or passphrase are invalid.' })
            }
        };
        reader.readAsArrayBuffer(keystore)
    };
    return (
        <div className="card shadow">
            {hashes.length > 0 ? (
                <div>
                    <div className="card-body">
                        <button className="btn btn-outline-dark" onClick={handleReset}>
                            <i className="fas fa-arrow-left mr-1"></i> Back
                        </button>
                    </div>
                    {hashes.map(({ alias, sha1hex, sha1fingerprint, sha256hex, sha256fingerprint, base64 }) => (
                        <div className="card-body border-top">
                            <h5 className="card-title text-secondary">{alias}</h5>
                            <div className="text-nowrap overflow-auto">
                                <small style={{'lineHeight': '.75em'}}>
                                    <strong>SHA-1 + Hex:</strong><br/><span className="text-monospace">{sha1hex}</span>
                                    <br />
                                    <strong>SHA-1 + Fingerprint:</strong><br/><span className="text-monospace">{sha1fingerprint}</span>
                                    <br />
                                    <strong>SHA-1 + Base64:</strong><br/><span className="text-monospace">{base64}</span>
                                    <br />
                                    <strong>SHA-256 + Hex:</strong><br/><span className="text-monospace">{sha256hex}</span>
                                    <br />
                                    <strong>SHA-256 + Fingerprint:</strong><br/><span className="text-monospace">{sha256fingerprint}</span>
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <div className="card-body">
                        <h1 className="h5 card-title text-primary">Use a Keystore</h1>
                        <p className="card-text">
                            Use this utility to generate <strong>SHA-1/SHA-256</strong> <em>Hex</em> and <em>Base64</em> values from signing certificates in a Java keystore.
                        </p>
                    </div>
                    <div className="card-body border-top">
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fields-keystore">Keystore <span className="text-danger">*</span></label>
                                <div className="custom-file">
                                    <input className={classNames(['custom-file-input', { 'is-invalid': errors.hasOwnProperty('keystore') }])} id="fields-keystore" onChange={e => setKeystore(e.target.files[0])} required type="file" />
                                    <label className="custom-file-label" htmlFor="fields-keystore" data-browse="Choose file&hellip;">
                                        {keystore ? keystore.name : ''}
                                    </label>
                                    {errors.hasOwnProperty('keystore') ? <div className="invalid-feedback">{errors['keystore']}</div> : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fields-passphrase">Passphrase <span className="text-danger">*</span></label>
                                <input className={classNames(['form-control', { 'is-invalid': errors.hasOwnProperty('passphrase') }])} id="fields-passphrase" onChange={e => setPassphrase(e.target.value)} required type="password" />
                                {errors.hasOwnProperty('passphrase') ? <div className="invalid-feedback">{errors['passphrase']}</div> : null}
                            </div>
                            <button className="btn btn-primary">
                                Generate <i className="fas fa-arrow-right ml-1"></i>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
