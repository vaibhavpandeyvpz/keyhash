import React, { useState } from 'react';
import classNames from "classnames";

export default () => {
    const [errors, setErrors] = useState({});
    const [hex, setHex] = useState(null);
    const [base64, setBase64] = useState('');
    const handleReset = () => {
        setHex(null);
        setBase64('');
    };
    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
        setBase64(null);
        try {
            const ints = hex.split(':');
            if (ints.length !== 20) {
                throw 'Bad SHA-1 fingerprint. Invalid format.'
            }

            const sha1 = ints.map(c => String.fromCharCode(parseInt(c, 16))).join('');
            setBase64(btoa(sha1))
        } catch (e) {
            console.error(e);
            setErrors({ 'hex': 'The hex does not seem to be valid SHA-1.' })
        }
    };
    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="h5 card-title text-primary">Use existing SHA-1</h1>
                <p className="card-text">
                    Use this utility to generate <em>Base64</em> value from <strong>SHA-1</strong> fingerprint obtained from Play Console account.
                </p>
            </div>
            <div className="card-body border-top">
                <form method="post" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fields-hex">SHA-1 hex <span className="text-danger">*</span></label>
                        <input className={classNames(['form-control', { 'is-invalid': errors.hasOwnProperty('hex') }])} id="fields-hex" onChange={e => setHex(e.target.value)} required />
                        {errors.hasOwnProperty('hex') ? <div className="invalid-feedback">{errors['hex']}</div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fields-base64">SHA-1 Base64</label>
                        <input className={classNames(['form-control', { 'is-invalid': errors.hasOwnProperty('base64') }])} id="fields-base64" readOnly={true} value={base64} />
                        {errors.hasOwnProperty('base64') ? <div className="invalid-feedback">{errors['base64']}</div> : null}
                    </div>
                    <button className="btn btn-secondary">
                        Generate <i className="fas fa-arrow-right ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}
