const prisma = require("../config/prisma");
const { generatePrompt } = require("../services/promptService");
const { generateImage } = require("../services/imageService");


exports.generateContent = async (req, res) => {
  try {
    const { productName, description } = req.body;

    // Create Job
    const job = await prisma.job.create({
      data: {
        productName,
        description,
        originalImage: req.file?.filename,
        status: "PENDING",
      },
    });

    // Generate Prompt
    const prompt = await generatePrompt(productName, description);

    // Update status to PROCESSING
    await prisma.job.update({
      where: { id: job.id },
      data: {
        status: "PROCESSING",
        prompt,
      },
    });

    // Generate Image (placeholder)
    const generatedImage = await generateImage(
      prompt,
      req.file?.filename
    );

    // Mark job as completed
    const completedJob = await prisma.job.update({
      where: { id: job.id },
      data: {
        generatedImage,
        status: "COMPLETED",
      },
    });

    res.status(201).json({
      success: true,
      message: "Content generated successfully",
      jobId: completedJob.id,
      status: completedJob.status,
      data: completedJob,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};