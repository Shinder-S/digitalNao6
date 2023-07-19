module.exports = mongoose => {
    const Model = mongoose.model(
        "model",
        mongoose.Schema(
            {
                title: String,
                description: String,
                checked: Boolean
            },
            { timestamps: true }
        )
    );
    return Model;
}