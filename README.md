# Dear Diary

<img src="https://github.com/Deepak-Sangle/Dear-Diary/assets/78836762/69bb3ae0-e15f-46d0-997d-506168d2c3bd" align="right" alt="logo" width="180" height="180"> </img>

Dear Diary is a user friendly project where users can safely store their day to day life events. The data is protected using various sophisticated end to end encryption techniques. Thus, users can reliably store their personal information all in one place.  

* **RSA Encryption** and **SHA Hashing** Techniques used for security purpose.
* Addition **Salting** techniques for password storage.
* **Independent Secret keys** for each user to enhance security.
* Usage of **Master Keys** to store everything in encrypted manner, even the encryption keys itself!
* **Cookie based Authorization** along with refresh tokens.
* User friendly, minimalistic and simple **UI**. 

## API's

For payload of type 

```json
{
    "detail" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore tempora error, temporibus maxime nihil necessitatibus possimus sit. Aliquam, nam quasi dolorem inventore enim sequi minima aspernatur maxime atque ducimus!"
}
```

we are storing this event as follows

```json
{
    "message": "New event succesfully created : ",
    "success": true,
    "data": {
        "createdBy": "650a9199edbfcd73eff7874e",
        "createdAt": "2023-09-23T23:16:30.631Z",
        "detail": "52fd5fa6c25243fdbcd94ca1b9fff9b9065094b9473edcf722ed78f30b882098c1a834474396f256f357eb493afc427f01995486ec344d5933251595ddd9e720623af0bca1cee84435b8003879394ecf4befb262b5d376f0d9d46695c084279f96abd99a727b9a6cb4e80880897c8ca144d278608d232caa77de43c1de23abcc3a206fff80e2c10670a3511bbe1ac47183ec4a90f5ec17a32b0eb7d494f5f54e36143e873ccfb44fadd4d538fa9bd2e15b7466f5f293b67ed89d16442f7bcee6234df6e12b374239949102e90dcc081cb37cb1dc154020f5c57aa41ae00a7ee12a2845a8f207a1d88578dbe5db44d29cf1c844bbd3d7ac8f4ae5473b9eb85f8dc3b596859f9ea347388afd39a7d832100458ceb6bcd3026e9f1182abd519c5a051855685c2ff04aa25d4ce4e8e3145133983b340cf633f65f3ef61eef2167076a3e54d34bf97f669b81061d5447429c933151c02ec2bdc1c0c2e57a7d1f050b47e2f55e2f6f2f90bd6dfa83fca8d0ed1b56e8d166f0e244e4186a636c711e3b885e1b0138e1a9ca59850dda685f24164cbeceaaf7547b1c3e814c16de34a2e1b1b88ad174e591db318d33bde363d0c5c5a5d98bcf2d778c6140b4d7c2b3c9dcce7f884fb7fc91ec63e022c7a039a111aa951f05dd933115e6792fc45e79765f47a18f0362adbfd6152b9ddc2deedb6d17425b08fcc92254e08871273a8ba3124b4e4092077d7510c79476880b84d069c2e0cc093d12ef05545eab54ff6c68ae9789afb9d9c8dbde3064e1db6426948d20a233754779fbea5e5a8fbfb9edb70b2b45a802dc70af71ef210ba6c907dfcd67f6b845f9ff1fe6f0f3c61f30b7d4ba26704df5ad04473f56d45d0042afbe223b4214cf82f6a301cfabbf58915585efd896721ce6016aca8c3d4bda33d98248bc961e15817ed71662ced38fb55dfd55a2d532d97f20550a6c9afc28ad60cd0a03e4933594ee52e649709b248251c4f713fcb5c4f880c41ef80d32f1ea8fed0ccd109592f32174480f37b5e283d97ac029a42597da2a5e17af2e187dbb30a83ab9b3ead42aeb5a3d4dd46c0e09d6d22cb8bfb21c96d248561a00f85b9fd613a330b269c816a337188f4d158657e09e81ef45f1769461266ffd170c0c1390d11044f4a974c807a7133470549bf937f41763cd71a094691c96666cc9a642685e78361c15b60e3e4ca6a34cbfaf10ae996af064c1199efd82c3bed14dcb84dfea4d0662d19d526a5475da53400fe733792f0c1cf7c5de680346edcaf442d626ea39fa08f6a625112f4e701b4ea5552c23f75874868ea2910aa05dc28cc594ada0289f0155c3abf0dff7210174a972dee4c072b9f615176b2039eab67c5e3be1af0448d40158c39a7d011dbeaa23e6f05496996206779d28cc97dfd8bf8c851ff596523470827845fbfd8bb7edbc18112dcd321175adba3ade0a128819004382679ef2513d74cfb04e23eae91d229d7c86a1191ffbfa7e0962b28cb8381e54416b3aec53fec90771198e0f087d9b76be99b14dc762ea2089da0dcf4b424503cb720e6310d291299a0bd46494d420b6f2d2fffe2cf8f660ff7233815c282bf6d4a7db1d0496e4ef510590c9926d9c90933c6a2ef0b7a08ee9a7c88cd87ab3f929679f6dd968d5ac2fefc456fa21c8d355ea5aebbaf054a3730d7943e70e0d3c63a88a57d83dea53b4c942c557ea0efce5a02add5ed8362e65e0eb213cc32def46eca441ea8f8468e1e5afa11f69c274ab5e53ce77808327abc04c1b25daf838d67c6772b462a0794e08cee24d9eb97934212395ea27f20eaed9e59d5fb7044fabe700c78e9db43959a9c54c2270c4c610f9d96e3e5cf0a7d0fcddadd3bc63ef99f5267437d079ab447380c62fcb039cd3e46c5690b33c815c00b04ec0200368cd7ee44553bacac78627226657cc0f6180117b414bfeac181a7afe15b2eef8c4531ff6e932aa50455abe6c60fb69cd2ac84ee2e54cf001e9997eca80be0d5957d56b81a1f82b9c93a74176f355a47199ee4d21023a0c275b78ef7adfb64c371719f076c3e75e63e9432dcc138d17cd23be847bd8dcd77b2683cdb70cb17e05f8225dc10956b69359adc642cdff7099567bcf1e577712afb3d9d21fb85b6a2b382c60119b06df3f7b09ec421c673c94977b0f8a9d7e415c59385e1afdaa8aee04d2ae84b981a2076e3f701754afa8a958415ef19fe571d9d2fdf497a8303c84cd90ccbae24c23cff7fa69d02cbef667da1ff895894287f13d7509abb5d8d2e175fec11355f27838c981bccec94651263d7f1450baa8001a5664dddf326cad2095f4651dbf0082cec201323da1990f03b16a41443503f084ceb6a0e8f2e5a9a437d5ce2c156cd99fd76d7bcbe066a951bcc1ce7e3fb2f91405ec9ac74eff2648e8e46be6b451356385c4ea8da97f79db782bc2529a3ca87330e658a63b4b926e9873ff98ad33fc86f6c1e55086cf6ef2f5026902b5a7eb5ae221deea46f3727398de4807e78f23da352c815a147d545be4f4503561531d2b446c5b7a9d3818b0b6d782762217d429ef843e7a251b9ac14a10a3806679abdf0bb8185d470fb9be8e92ec1fd72960d5fe50b1d3b1103584e0d8ee0027dc190a01e2d62d804d9cdee5877e8af35272e909e77e07927411822688c88dc9b71a751b71fd677aaf83a2c6a748fe02aaeb455e4ab8d4390e558dda30c2ab013d86d0ba9c3cb5ea0ed84947d082c3ea6c3be2b5d13b364001647c34256ef939f3ffe0b54bf7749090da7ad1b92a79f6f64876f0c1a6768a5a10bc3e592666508cd248b2aa39eab49d7b9673a6182d5f2fb7905de3b8d03f14fa96d1f6d304986cccedf4d9a4ab1b6b84fb820d8fb93680c3cdae0467aec5d266ac8949b095f18a026d25e5908177587a4f1adedfd630ad06a82b77f8371d1ea7dfb15bf586159260292ec8c10c20c14d1765ed0f04a",
        "initVector": "59b2c4ff66647b2e3b689b731f94305a6a1f022e5b2d013e63d55715f443eef00f6f945cfb70185800d08a03be624306",
        "_id": "650f71ceeb7580f0196410e2",
        "__v": 0
    }
}
```


https://github.com/Deepak-Sangle/Dear-Diary/assets/78836762/e135173f-6990-4734-93d5-0386aa119b4b

## Usage

One requires Node Js and React Js installed in their system in order to setup and use this software

1. For client side:

    ```sh
    cd web-client
    npm install
    npm start
    ```

2. For server side:

    ```sh
    cd server
    npm install
    nodemon app
    ```
