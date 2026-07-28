const prisma = require("../config/prisma");
const { generatePrompt } = require("../services/promptService");
const { generateImage } = require("../services/imageService");

exports.generateContent = async (req, res) => {
  let job = null;

  try {
    const { productName, description } = req.body;

    // Input Validation
    if (!productName || !description || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Product name, description and image are required.",
      });
    }

    // Create Job
    job = await prisma.job.create({
      data: {
        productName,
        description,
        originalImage: req.file.filename,
        status: "PENDING",
      },
    });

    // Generate AI Prompt
    const prompt = await generatePrompt(productName, description);

    // Update Job Status
    await prisma.job.update({
      where: {
        id: job.id,
      },
      data: {
        prompt,
        status: "PROCESSING",
      },
    });

    // Generate Image (Placeholder)
    const generatedImage = await generateImage(
      prompt,
      req.file.filename
    );

    // Complete Job
    const completedJob = await prisma.job.update({
      where: {
        id: job.id,
      },
      data: {
        generatedImage,
        status: "COMPLETED",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Content generated successfully.",
      jobId: completedJob.id,
      status: completedJob.status,
      data: completedJob,
    });

  } catch (error) {
    console.error(error);

    // Mark Job as FAILED if it was already created
    if (job) {
      try {
        await prisma.job.update({
          where: {
            id: job.id,
          },
          data: {
            status: "FAILED",
          },
        });
      } catch (updateError) {
        console.error("Failed to update job status:", updateError);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    // Validate Job ID
    if (isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};