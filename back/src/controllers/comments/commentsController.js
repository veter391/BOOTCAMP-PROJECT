import DB from '../../db/configDB.js';

// Agregar un comentario a una publicación
const addComment = async (req, res) => {
    try {
      const { post_id, user_id, comment_text } = req.body;

      // Obtener la fecha actual
      const created_at = new Date(); 
  
      // Insertar el comentario en la base de datos
      const dbInfo = await DB.sendQuery(queries.addComment, [post_id, user_id, comment_text, created_at]);
  
      res.status(201).json({ ...req.body, id: dbInfo.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener todos los comentarios de una publicación
  const getCommentsById = async (req, res) => {
    try {
      const { post_id } = req.params;
  
      // Obtener los comentarios de la base de datos para una publicación específica
      const comments = await DB.sendQuery(queries.getCommentsById, [post_id]);
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getAllComments = async (req, res) => {
    try {
      const { post_id } = req.params;
  
      const comments = await DB.sendQuery(DB.query.getAllCommentsForPost, [post_id]);
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Actualizar un comentario existente
  const updateComment = async (req, res) => {
    try {
      const { id } = req.params;
      const { comment_text } = req.body;
  
      // Actualizar el comentario en la base de datos
      const dbInfo = await DB.sendQuery(queries.updateComment, [comment_text, id]);
  
      if (dbInfo.affectedRows !== 0) {
        res.status(200).json({ message: `Comment ${id} updated successfully` });
      } else {
        res.status(404).json({ message: 'Comment not found or no changes applied' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Eliminar un comentario
  const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Eliminar el comentario de la base de datos
      await DB.sendQuery(queries.deleteComment, [id]);
  
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export default {
    addComment,
    getCommentsById,
    getAllComments,
    updateComment,
    deleteComment
  };