using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotation_Quaternion : MonoBehaviour
{
    private Quaternion _initialRotation;
    private float _angle;

    void Start()
    {
        _initialRotation = gameObject.transform.rotation;
    }

    void Update()
    {
        _angle += Time.deltaTime * 50f;
        
        var xRotation = Quaternion.AngleAxis(_angle, Vector3.right);
        var zRotation = Quaternion.AngleAxis(_angle, Vector3.forward);
        
        var finalRotation = _initialRotation * xRotation * zRotation;
        
        transform.rotation = finalRotation;
    }
}

