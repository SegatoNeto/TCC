const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./note.proto";

const loaderOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const ourServer = new grpc.Server();
let emailRecords = {
    "emails": [
        { id: "153642", nome: "Neto", email: "Neto@Segato.com" },
        { id: "234654", nome: "Oswaldo", email: "Oswaldo@Segato.com" },]
};

ourServer.addService(grpcObj.EmailService.service, {
    /*our protobuf message(passwordMessage) for the RetrievePasswords was Empty. */
    retrieveEmail: (emailMessage, callback) => {
        callback(null, emailRecords);
    },
    addNewEmail: (emailMessage, callback) => {
        const emailDetails = { ...emailMessage.request };
        emailRecords.emails.push(emailDetails);
        callback(null, emailDetails);
    },
    updateDetails: (emailMessage, callback) => {
        const detailsID = emailMessage.request.id;
        const targetDetails = emailRecords.emails.find(({ id }) => detailsID == id);
        targetDetails.id = emailMessage.request.id;
        targetDetails.nome = emailMessage.request.nome;
        targetDetails.email = emailMessage.request.email;
        callback(null, targetDetails);
    },
});

ourServer.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://127.0.0.1:50051");
        ourServer.start();
    }
);