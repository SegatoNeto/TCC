const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./note.proto";
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var grpcObj = protoLoader.loadSync(PROTO_PATH, options);
const EmailService = grpc.loadPackageDefinition(grpcObj).EmailService;

const clientStub = new EmailService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

clientStub.addNewEmail(
    {
        id: "22",
        nome: "Oswaldo",
        email: "Segato@neto",
    },
    (error, emailDetails) => {
        //implement your error logic here
        console.log(emailDetails);
    }
);

clientStub.retrieveEmail({}, (error, emails) => {
    //implement your error logic here
    console.log(emails);
});




        




