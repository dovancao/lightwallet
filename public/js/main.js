
let web3 = new Web3();

function setWeb3Provider(keystore){
    let web3Provider = new HookedWeb3Provider({
        host: "https://localhost:8545",
        transaction_signer: keystore
    });
    web3.setProvider(web3Provider);
}

console.log("do phuc son");

$(document).ready(function(){
$("#form").submit(function(e){
    e.preventDefault();
    let password = document.getElementById("pw").value;
    let secretSeed = lightwallet.keystore.generateRandomSeed();

    console.log(password);

    lightwallet.keystore.createVault({
        password: password,
        seedPhrase: secretSeed,
        hdPathString: "m/0'/0'/0'"
    },function(err,ks){
        ks.keyFromPassword(password, function(err,pwDerivedKey){
            if(err) document.getElementById("info").innerHTML =err;
            console.log(ks);
            ks.generateNewAddress(pwDerivedKey, 1);
            let address = ks.getAddresses()[0];
            let private_key = ks.exportPrivateKey(address,pwDerivedKey);
            setWeb3Provider(ks);

            

            $("#col-md-6").empty();
            $("#result-list").html();
            $("#result-list").append(`<p>You must save and backup the keys below. If you lose them, you lose access to your assets. You can click "Save Key" to save the encrypted key in local application storage. Verify that you can log in to the account and see the correct public address before sending anything to the address below!</p>`)
                                .append(`<canvas id="qrcodeAdress"></canvas>`)
                                .append(`<p><b>Passphrase: </b>${password}</p>`)
                                .append(`<p><b>Addresses: </b>${address}</p>`)
                                .append(`<p><b>Private key: </b>${private_key}</p>`)
                                .append(`<button type="button" class="btn btn-result-list" id="keystore">Download Keystore File(UTC/JSON)</button>`)
                                .append(`<button type="button" class="btn btn-result-list" id="continue">I saved my wallet infomation</button>`)
            })
            console.log(document.getElementById('qrcodeAdress'));

            QRCode.toCanvas(document.getElementById('qrcodeAdress'),'address',function(error){
                if(error) console.log(error);
                console.log("qrcode successfully created");
            });

        })
    });
});
        

